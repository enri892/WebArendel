package es.arendel.web_arendel.controller;

import es.arendel.web_arendel.models.JobApplicationDTO;
import es.arendel.web_arendel.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/job-applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Map<String, Object>> createJobApplication(
            @Valid @ModelAttribute JobApplicationDTO jobApplicationDTO,
            BindingResult bindingResult) {

        Map<String, Object> response = new HashMap<>();

        // Si hay errores de validación, devolverlos
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(
                            error -> error.getField(),
                            error -> error.getDefaultMessage(),
                            (existing, replacement) -> existing + "; " + replacement
                    ));

            response.put("success", false);
            response.put("message", "Errores de validación encontrados");
            response.put("errors", errors);
            return ResponseEntity.badRequest().body(response);
        }

        // Procesar la solicitud para enviarla por correo
        try {
            boolean result = jobApplicationService.processJobApplication(jobApplicationDTO);

            if (result) {
                response.put("success", true);
                response.put("message", "Solicitud enviada exitosamente");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Error interno al procesar la solicitud");
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error inesperado: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}