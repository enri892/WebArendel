package es.arendel.web_arendel.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * HTTP 415 - Tipo de contenido no soportado
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Map<String, Object>> handleUnsupportedMediaType(HttpMediaTypeNotSupportedException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Tipo de contenido no soportado. Este endpoint requiere multipart/form-data");
        response.put("supportedMediaTypes", e.getSupportedMediaTypes().toString());
        response.put("receivedMediaType", e.getContentType() != null ? e.getContentType().toString() : "null");
        return ResponseEntity.badRequest().body(response);
    }

    /**
     * HTTP 413 - Archivo demasiado grande
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxUploadSize(MaxUploadSizeExceededException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "El archivo es demasiado grande. Tamaño máximo permitido: 5MB");
        return ResponseEntity.badRequest().body(response);
    }
}