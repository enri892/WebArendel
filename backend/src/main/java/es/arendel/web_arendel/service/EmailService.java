package es.arendel.web_arendel.service;

import es.arendel.web_arendel.models.JobApplicationDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.recipient}")
    private String recipientEmail;

    @Value("${app.upload.cv-directory}")
    private String uploadDirectory;

    public boolean sendJobApplicationEmail(JobApplicationDTO application, String savedFileName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Configurar destinatarios
            helper.setTo(recipientEmail);
            helper.setSubject("Nueva Solicitud de Empleo - " + application.getNombre());

            // Crear contenido HTML del email
            String htmlContent = buildEmailContent(application);
            helper.setText(htmlContent, true);

            // Adjuntar CV si existe
            if (savedFileName != null && !savedFileName.isEmpty()) {
                Path cvPath = Paths.get(uploadDirectory, savedFileName);
                File cvFile = cvPath.toFile();

                if (cvFile.exists()) {
                    FileSystemResource file = new FileSystemResource(cvFile);
                    helper.addAttachment("CV_" + application.getNombre() + ".pdf", file);
                }
            }

            // Enviar email
            mailSender.send(message);
            logger.info("Email enviado exitosamente para solicitud de: {}", application.getEmail());
            return true;

        } catch (MessagingException e) {
            logger.error("Error al enviar email para solicitud de: {}", application.getEmail(), e);
            return false;
        } catch (Exception e) {
            logger.error("Error inesperado al enviar email", e);
            return false;
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
                .append("</ul>");

        if (application.getExperiencia() != null && !application.getExperiencia().trim().isEmpty()) {
            content.append("<p><strong>Experiencia:</strong></p>")
                    .append("<p>").append(application.getExperiencia()).append("</p>");
        }

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

    // Método para enviar email de confirmación al candidato
    public boolean sendConfirmationEmail(JobApplicationDTO application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(application.getEmail());
            helper.setSubject("Confirmación de Solicitud de Empleo - Arendel");

            String htmlContent = buildConfirmationContent(application);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Email de confirmación enviado a: {}", application.getEmail());
            return true;

        } catch (MessagingException e) {
            logger.error("Error al enviar email de confirmación a: {}", application.getEmail(), e);
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
                getContratoDescription(application.getContrato()) + "</strong>.</p>" +
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
