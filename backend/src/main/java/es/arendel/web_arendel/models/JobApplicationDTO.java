package es.arendel.web_arendel.models;

import es.arendel.web_arendel.validator.ValidJobPDF;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class JobApplicationDTO {

    // Getters y Setters
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

    // Disponibilidad (OBLIGATORIO)
    @NotBlank(message = "La disponibilidad es obligatoria")
    @Pattern(
            regexp = "^(manana|tarde|noche)(,(manana|tarde|noche))*$",
            message = "Disponibilidad inválida"
    )
    private String disponibilidad;

    // Localidad (OBLIGATORIO)
    @NotBlank(message = "La localidad es obligatoria")
    @Pattern(regexp = "^(Madrid|GranCanaria)$", message = "Localidad inválida")
    private String localidad;

    // Zonas (OBLIGATORIO) - Se envía como string separado por comas desde el frontend
    @NotBlank(message = "Debes seleccionar al menos una zona")
    @Pattern(
            regexp = "^(getafe-leganes|arganda-rivas|madrid|villanueva-brunete|toledo|telde|puertorico-mogan|maspalomas|arucas|vecindario)(,(getafe-leganes|arganda-rivas|madrid|villanueva-brunete|toledo|telde|puertorico-mogan|maspalomas|arucas|vecindario))*$",
            message = "Zonas inválidas"
    )
    private String zonas;

    //Comentarios adicionales (Opcional)
    @Size(max = 1000, message = "Los comentarios no pueden exceder 1000 caracteres")
    private String comentarios;

    // Validación CV.PDF (OBLIGATORIO)
    @NotBlank(message = "El CV es obligatorio")
    @ValidJobPDF(maxSize = 5242880) // 5MB
    private MultipartFile cv;

    // Constructores
    public JobApplicationDTO() {}

    // Métodos de utilidad para manejo de zonas
    public String[] getZonasArray() {
        if (zonas == null || zonas.trim().isEmpty()) {
            return new String[0];
        }
        return zonas.split(",");
    }

    public String getZonasFormatted() {
        if (zonas == null || zonas.trim().isEmpty()) {
            return "No especificadas";
        }
        return String.join(", ", getZonasArray());
    }

    // Métodos de utilidad para manejo de disponibilidad
    public String[] getDisponibilidadArray() {
        if (disponibilidad == null || disponibilidad.trim().isEmpty()) {
            return new String[0];
        }
        return disponibilidad.split(",");
    }

    public String getDisponibilidadFormatted() {
        if (disponibilidad == null || disponibilidad.trim().isEmpty()) {
            return "No especificada";
        }

        String[] disponibilidades = getDisponibilidadArray();
        StringBuilder formatted = new StringBuilder();

        for (int i = 0; i < disponibilidades.length; i++) {
            String disp = disponibilidades[i].trim();
            switch (disp) {
                case "manana" -> formatted.append("Mañana");
                case "tarde" -> formatted.append("Tarde");
                case "noche" -> formatted.append("Noche");
                default -> formatted.append(disp);
            }

            if (i < disponibilidades.length - 1) {
                formatted.append(", ");
            }
        }

        return formatted.toString();
    }

    // Métodos para obtener descripción de contrato
    public String getContratoDescription() {
        if (contrato == null) return "No especificado";

        return switch (contrato) {
            case "20-horas" -> "20 Horas - Jornada Media";
            case "30-horas" -> "30 Horas - Jornada Parcial";
            case "40-horas" -> "40 Horas - Jornada Completa";
            default -> contrato;
        };
    }

    // Métodos para obtener descripción de localidad
    public String getLocalidadDescription() {
        if (localidad == null) return "No especificada";

        return switch (localidad) {
            case "Madrid" -> "Madrid";
            case "GranCanaria" -> "Gran Canaria";
            default -> localidad;
        };
    }
}
