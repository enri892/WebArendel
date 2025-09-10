package es.arendel.web_arendel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Configuration
public class RateLimitingConfig {

    @Bean
    public OncePerRequestFilter rateLimitingFilter() {
        return new RateLimitingFilter();
    }

    private static class RateLimitingFilter extends OncePerRequestFilter {
        private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
        private final int MAX_REQUESTS_PER_MINUTE = 10; // Máximo 10 solicitudes por minuto por IP
        private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        public RateLimitingFilter() {
            // Limpiar contadores cada minuto
            scheduler.scheduleAtFixedRate(requestCounts::clear, 1, 1, TimeUnit.MINUTES);
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain) throws ServletException, IOException {

            // Solo aplicar rate limiting al endpoint de job applications
            if (!request.getRequestURI().contains("/api/v1/job-applications")) {
                filterChain.doFilter(request, response);
                return;
            }

            String clientIP = getClientIP(request);
            AtomicInteger requests = requestCounts.computeIfAbsent(clientIP, k -> new AtomicInteger(0));

            if (requests.incrementAndGet() > MAX_REQUESTS_PER_MINUTE) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"success\": false, \"message\": \"Demasiadas solicitudes. Inténtelo más tarde.\"}"
                );
                return;
            }

            filterChain.doFilter(request, response);
        }

        private String getClientIP(HttpServletRequest request) {
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0].trim();
            }
            String xRealIP = request.getHeader("X-Real-IP");
            if (xRealIP != null && !xRealIP.isEmpty()) {
                return xRealIP;
            }
            return request.getRemoteAddr();
        }
    }
}