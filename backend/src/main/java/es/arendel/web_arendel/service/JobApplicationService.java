package es.arendel.web_arendel.service;

import es.arendel.web_arendel.models.JobApplicationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/*
* Esto es solamente para el manejo del correo
* */
@Service
public class JobApplicationService {

    private static final Logger logger = LoggerFactory.getLogger(JobApplicationService.class);

    @Value("${app.upload.cv-directory}")
    private String uploadDirectory;

    @Autowired
    private EmailService emailService;

    public boolean processJobApplication(JobApplicationDTO application) {
        try {
            // 1. Validar y guardar el archivo CV (si existe)
            String savedFileName = null;
            if (application.getCv() != null && !application.getCv().isEmpty()) {
                savedFileName = saveFile(application.getCv(), application.getEmail());
            }

            // 2. Enviar email a la empresa
            boolean emailSent = emailService.sendJobApplicationEmail(application, savedFileName);
            if (!emailSent) {
                logger.warn("No se pudo enviar el email principal para: {}", application.getEmail());
            }

            // 3. Enviar email de confirmación al candidato
            boolean confirmationSent = emailService.sendConfirmationEmail(application);
            if (!confirmationSent) {
                logger.warn("No se pudo enviar email de confirmación a: {}", application.getEmail());
            }

//            4. Validaciones adicionales de negocio si es necesario
//            if (!validateBusinessRules(application)) {
//                return false;
//            }

            logger.info("Solicitud procesada exitosamente para: {}", application.getEmail());
            return emailSent; // Consideramos exitoso si al menos se envió el email principal

        } catch (Exception e) {
            logger.error("Error al procesar solicitud de empleo para: {}",
                    application.getEmail(), e);
            return false;
        }
    }

    private String saveFile(MultipartFile file, String email) throws IOException {
        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss_dd/MM/yyyy"));
        String fileName = String.format("CV_%s_%s_%s",
                file.getOriginalFilename(),
                timestamp);

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