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

/*
* Esto es para el manejo del correo
* */
@Service
public class JobApplicationService {

    private static final Logger logger = LoggerFactory.getLogger(JobApplicationService.class);

    @Value("${app.upload.cv-directory}")
    private String uploadDirectory;

    @Autowired
    private EmailService emailService;

    public boolean processJobApplication(JobApplicationDTO application) {
        String savedFileName = null;
        boolean emailSent = false;

        try {
            // 1. Validar y guardar el archivo CV (si existe)
            if (application.getCv() != null && !application.getCv().isEmpty()) {
                savedFileName = saveFile(application.getCv(), application.getEmail());
            }

            // 2. Enviar email a la empresa
            emailSent = emailService.sendJobApplicationEmail(application, savedFileName);
            if (!emailSent) {
                logger.warn("No se pudo enviar el email principal para: {}", application.getEmail());
            }

            // 3. Enviar email de confirmación al candidato
            boolean confirmationSent = emailService.sendConfirmationEmail(application);
            if (!confirmationSent) {
                logger.warn("No se pudo enviar email de confirmación a: {}", application.getEmail());
            }

            logger.info("Solicitud procesada exitosamente para: {}", application.getEmail());
            return emailSent;

        } catch (Exception e) {
            logger.error("Error al procesar solicitud de empleo para: {}", application.getEmail(), e);
            return false;
        } finally {
            // Eliminar archivo si no se envió el correo principal (fallback)
            if (savedFileName != null && !emailSent) {
                deleteFile(savedFileName);
            }
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

//    private boolean validateBusinessRules(JobApplicationDTO application) {
//        // Validaciones adicionales de negocio
//        // Por ejemplo: verificar límite de solicitudes por email, validar disponibilidad del tipo de contrato, etc.
//
//
//        return true;
//    }
}