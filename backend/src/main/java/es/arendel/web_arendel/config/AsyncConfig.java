package es.arendel.web_arendel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // La configuración del pool ya está en application.properties
    // spring.task.execution.pool.core-size
    // spring.task.execution.pool.max-size
    // spring.task.execution.pool.queue-capacity
}
