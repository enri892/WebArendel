package es.arendel.web_arendel.models;

import es.arendel.web_arendel.validator.ValidJobPDF;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

public class JobApplicationDTO {

    //Nombre (OBLIGATORIO)
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$", message = "El nombre solo puede contener letras y espacios")
    private String nombre;

    //Teléfono (OBLIGATORIO)
    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Formato de teléfono inválido")
    private String telefono;

    //Correo (OBLIGATORIO)
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    @Size(max = 254, message = "El email es demasiado largo")
    private String email;

    //Tipo Contrato (OBLIGATORIO)
    @NotBlank(message = "El tipo de contrato es obligatorio")
    @Pattern(regexp = "^(20-horas|30-horas|40-horas)$", message = "Tipo de contrato inválido")
    private String contrato;

    //Experiencia (Opcional)
    @Size(max = 500, message = "La experiencia no puede exceder 500 caracteres")
    private String experiencia;

    //Comentarios adicionales (Opcional)
    @Size(max = 1000, message = "Los comentarios no pueden exceder 1000 caracteres")
    private String comentarios;

    // Validación CV.PDF (Opcional)
    @ValidJobPDF(maxSize = 5242880) // 5MB
    private MultipartFile cv;

    // Constructores
    public JobApplicationDTO() {}

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContrato() { return contrato; }
    public void setContrato(String contrato) { this.contrato = contrato; }

    public String getExperiencia() { return experiencia; }
    public void setExperiencia(String experiencia) { this.experiencia = experiencia; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public MultipartFile getCv() { return cv; }
    public void setCv(MultipartFile cv) { this.cv = cv; }
}
