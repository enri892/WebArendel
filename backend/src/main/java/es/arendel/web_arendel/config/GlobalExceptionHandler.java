package es.arendel.web_arendel.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

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

    /**
     * Endpoint no encontrado (404)
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(NoHandlerFoundException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "404 - Nada por aquí");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * Errores de E/O (disco lleno, permisos, etc.)
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<Map<String, Object>> handleIOException(IOException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Error interno del servidor. Inténtelo más tarde");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    /**
     * Timeouts en envío de emails
     */
    @ExceptionHandler(TimeoutException.class)
    public ResponseEntity<Map<String, Object>> handleTimeout(TimeoutException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "El servidor tardó demasiado en responder. Inténtelo más tarde");
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(response);
    }

}