package es.arendel.web_arendel.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import es.arendel.web_arendel.models.JobApplicationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.concurrent.CompletableFuture;

@Service
public class SendGridEmailService {

    private static final Logger logger = LoggerFactory.getLogger(SendGridEmailService.class);

    @Value("${sendgrid.api.key}")
    private String apiKey;

    @Value("${app.email.recipient}")
    private String recipientEmail;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.upload.cv-directory}")
    private String uploadDirectory;

    @Async
    public CompletableFuture<Boolean> sendJobApplicationEmailAsync(JobApplicationDTO application, String savedFileName) {
        boolean result = sendJobApplicationEmail(application, savedFileName);
        return CompletableFuture.completedFuture(result);
    }

    public boolean sendJobApplicationEmail(JobApplicationDTO application, String savedFileName) {
        try {
            // Configurar emails
            Email from = new Email(fromEmail, "Arendel - Sistema de RRHH");
            Email to = new Email(recipientEmail);
            String subject = "Nueva Solicitud de Empleo - " + application.getNombre();

            // Contenido HTML del email
            Content content = new Content("text/html", buildEmailContent(application));

            // Crear mail
            Mail mail = new Mail(from, subject, to, content);

            // Adjuntar CV si existe
            if (savedFileName != null && !savedFileName.isEmpty()) {
                attachCV(mail, savedFileName, application.getNombre());
            }

            // Enviar email
            SendGrid sg = new SendGrid(apiKey);
            Request request = new Request();

            try {
                request.setMethod(Method.POST);
                request.setEndpoint("mail/send");
                request.setBody(mail.build());

                Response response = sg.api(request);

                if (response.getStatusCode() >= 200 && response.getStatusCode() < 300) {
                    logger.info("Email enviado exitosamente via SendGrid para: {}", application.getEmail());
                    return true;
                } else {
                    logger.error("Error enviando email via SendGrid. Status: {}, Body: {}",
                            response.getStatusCode(), response.getBody());
                    return false;
                }

            } catch (IOException e) {
                logger.error("Error de conexión con SendGrid API", e);
                return false;
            }

        } catch (Exception e) {
            logger.error("Error inesperado enviando email via SendGrid", e);
            return false;
        } finally {
            // Eliminar archivo después de enviar
            if (savedFileName != null && !savedFileName.isEmpty()) {
                deleteFile(savedFileName);
            }
        }
    }

    private void attachCV(Mail mail, String savedFileName, String candidateName) {
        try {
            Path cvPath = Paths.get(uploadDirectory, savedFileName);
            File cvFile = cvPath.toFile();

            if (cvFile.exists()) {
                byte[] fileContent = Files.readAllBytes(cvPath);
                String encodedFile = Base64.getEncoder().encodeToString(fileContent);

                Attachments attachments = new Attachments();
                attachments.setContent(encodedFile);
                attachments.setType("application/pdf");
                attachments.setFilename("CV_" + candidateName.replaceAll("[^a-zA-Z0-9]", "_") + ".pdf");
                attachments.setDisposition("attachment");

                mail.addAttachments(attachments);
                logger.info("CV adjuntado correctamente: {}", savedFileName);
            }
        } catch (Exception e) {
            logger.error("Error adjuntando CV: {}", savedFileName, e);
        }
    }

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

    private String buildEmailContent(JobApplicationDTO application) {
        StringBuilder content = new StringBuilder();

        content.append("<!DOCTYPE html>")
                .append("<html><head><meta charset='UTF-8'></head><body>")
                .append("<h2>Nueva Solicitud de Empleo</h2>")
                .append("<div style='font-family: Arial, sans-serif; line-height: 1.6;'>")
                .append("<p><strong>Datos del Candidato:</strong></p>")
                .append("<ul>")
                .append("<li><strong>Nombre:</strong> ").append(application.getNombre()).append("</li>")
                .append("<li><strong>Email:</strong> ").append(application.getEmail()).append("</li>")
                .append("<li><strong>Teléfono:</strong> ").append(application.getTelefono()).append("</li>")
                .append("<li><strong>Tipo de Contrato Solicitado:</strong> ").append(getContratoDescription(application.getContrato())).append("</li>")
                .append("<li><strong>Localidad:</strong> ").append(application.getLocalidad()).append("</li>")
                .append("</ul>");

        if (application.getComentarios() != null && !application.getComentarios().trim().isEmpty()) {
            content.append("<p><strong>Comentarios Adicionales:</strong></p>")
                    .append("<p>").append(application.getComentarios()).append("</p>");
        }

        content.append("</div>")
                .append("<hr>")
                .append("<p style='color: #666; font-size: 12px;'>")
                .append("Este email fue generado automáticamente desde el sistema de solicitudes de empleo de Arendel.")
                .append("</p>")
                .append("</body></html>");

        return content.toString();
    }

    private String getContratoDescription(String contrato) {
        return switch (contrato) {
            case "20-horas" -> "20 horas semanales";
            case "30-horas" -> "30 horas semanales";
            case "40-horas" -> "40 horas semanales (Tiempo completo)";
            default -> contrato;
        };
    }

    @Async
    public CompletableFuture<Boolean> sendConfirmationEmailAsync(JobApplicationDTO application) {
        boolean result = sendConfirmationEmail(application);
        return CompletableFuture.completedFuture(result);
    }

    public boolean sendConfirmationEmail(JobApplicationDTO application) {
        try {
            Email from = new Email(fromEmail, "Arendel - Recursos Humanos");
            Email to = new Email(application.getEmail());
            String subject = "Confirmación de Solicitud de Empleo - Arendel";

            Content content = new Content("text/html", buildConfirmationContent(application));
            Mail mail = new Mail(from, subject, to, content);

            SendGrid sg = new SendGrid(apiKey);
            Request request = new Request();

            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);

            if (response.getStatusCode() >= 200 && response.getStatusCode() < 300) {
                logger.info("Email de confirmación enviado via SendGrid a: {}", application.getEmail());
                return true;
            } else {
                logger.error("Error enviando confirmación via SendGrid. Status: {}", response.getStatusCode());
                return false;
            }

        } catch (Exception e) {
            logger.error("Error enviando email de confirmación via SendGrid a: {}", application.getEmail(), e);
            return false;
        }
    }

    private String buildConfirmationContent(JobApplicationDTO application) {
        return "<!DOCTYPE html>" +
                "<html><head><meta charset='UTF-8'></head><body>" +
                "<div style='font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;'>" +
                "<h2 style='color: #333;'>¡Gracias por tu interés en Arendel!</h2>" +
                "<p>Estimado/a <strong>" + application.getNombre() + "</strong>,</p>" +
                "<p>Hemos recibido correctamente tu solicitud de empleo para el puesto de <strong>" +
                getContratoDescription(application.getContrato()) + " en " + application.getLocalidad() + "</strong>.</p>" +
                "<p>Nuestro equipo de Recursos Humanos revisará tu candidatura y te contactaremos en caso de que tu perfil encaje con nuestras necesidades actuales.</p>" +
                "<p>¡Gracias por considerar Arendel como tu próximo destino profesional!</p>" +
                "<br>" +
                "<p>Saludos cordiales,<br><strong>Equipo de RRHH - Arendel</strong></p>" +
                "<hr style='margin-top: 30px;'>" +
                "<p style='color: #666; font-size: 12px;'>Este es un email automático, por favor no responder a este mensaje.</p>" +
                "</div>" +
                "</body></html>";
    }
}
