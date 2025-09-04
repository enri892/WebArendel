package es.arendel.web_arendel.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class PDFFileValidator implements ConstraintValidator<ValidJobPDF, MultipartFile> {

    private long maxSize;

    @Override
    public void initialize(ValidJobPDF constraintAnnotation) {
        this.maxSize = constraintAnnotation.maxSize();
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {

//        if (file == null || file.isEmpty()) {
//            context.disableDefaultConstraintViolation();
//            context.buildConstraintViolationWithTemplate("El CV es obligatorio")
//                    .addConstraintViolation();
//            return false;
//        }

        // Validar tipo de archivo
        String contentType = file.getContentType();
        if (!"application/pdf".equals(contentType)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Solo se permiten archivos PDF")
                    .addConstraintViolation();
            return false;
        }

        // Validar tamaño
        if (file.getSize() > maxSize) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("El archivo excede el tamaño máximo permitido (5MB)")
                    .addConstraintViolation();
            return false;
        }

        // Validar extensión del nombre del archivo, mejorada
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.matches(".*\\.pdf$")) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("El archivo debe tener extensión .pdf")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}