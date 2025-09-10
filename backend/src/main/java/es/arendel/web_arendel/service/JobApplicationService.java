package es.arendel.web_arendel.service;

import es.arendel.web_arendel.models.JobApplicationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CompletableFuture;

@Service
public class JobApplicationService {

    private static final Logger logger = LoggerFactory.getLogger(JobApplicationService.class);

    @Value("${app.upload.cv-directory}")
    private String uploadDirectory;

    @Autowired
    private SendGridEmailService sendGridEmailService;

    public boolean processJobApplication(JobApplicationDTO application) {
        String savedFileName = null;

        try {
            // 1. Validar y guardar el archivo CV (si existe)
            if (application.getCv() != null && !application.getCv().isEmpty()) {
                savedFileName = saveFile(application.getCv(), application.getEmail());
            }

            // 2. Enviar emails de forma ASÍNCRONA
            CompletableFuture<Boolean> mainEmailFuture = sendGridEmailService.sendJobApplicationEmailAsync(application, savedFileName);
            CompletableFuture<Boolean> confirmationEmailFuture = sendGridEmailService.sendConfirmationEmailAsync(application);

            // 3. El usuario recibe respuesta inmediata (no esperamos a que terminen los emails)
            logger.info("Solicitud procesada exitosamente para: {} - Emails enviándose en segundo plano", application.getEmail());

            // Opcional: Si quieres logs de resultado (pero no bloqueas al usuario)
            mainEmailFuture.thenAccept(result -> {
                if (result) {
                    logger.info("Email principal enviado exitosamente para: {}", application.getEmail());
                } else {
                    logger.warn("Error al enviar email principal para: {}", application.getEmail());
                }
            });

            confirmationEmailFuture.thenAccept(result -> {
                if (result) {
                    logger.info("Email de confirmación enviado exitosamente para: {}", application.getEmail());
                } else {
                    logger.warn("Error al enviar email de confirmación para: {}", application.getEmail());
                }
            });

            return true; // Siempre devolvemos true porque el procesamiento básico fue exitoso

        } catch (Exception e) {
            logger.error("Error al procesar solicitud de empleo para: {}", application.getEmail(), e);

            // Si hay error, eliminar archivo si se guardó
            if (savedFileName != null) {
                deleteFile(savedFileName);
            }

            return false;
        }
    }

    /**
     * Elimina el archivo del servidor
     */
    private void deleteFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadDirectory, fileName);
            File file = filePath.toFile();

            if (file.exists()) {
                if (file.delete()) {
                    logger.info("Archivo eliminado exitosamente: {}", fileName);
                } else {
                    logger.warn("No se pudo eliminar el archivo: {}", fileName);
                }
            }
        } catch (Exception e) {
            logger.error("Error al intentar eliminar el archivo: {}", fileName, e);
        }
    }

    private String saveFile(MultipartFile file, String email) throws IOException {
        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy_HH'h'mm'm'ss's'"));
        String fileName = String.format("CV_%s_%s",
                timestamp,
                file.getOriginalFilename().replaceAll("[\\\\/:*?\"<>|]", "_"));

        // Guardar archivo
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        logger.info("Archivo guardado en: {}", filePath.toAbsolutePath());
        return fileName;
    }
}
