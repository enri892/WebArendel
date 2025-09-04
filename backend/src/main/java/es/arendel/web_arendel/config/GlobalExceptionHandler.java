package es.arendel.web_arendel.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxUploadSize(MaxUploadSizeExceededException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "El archivo es demasiado grande. Tamaño máximo permitido: 5MB");
        return ResponseEntity.badRequest().body(response);
    }
}