# backend/Dockerfile con curl para health checks

FROM openjdk:21-jdk-slim

# Instalar curl para health checks
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar los archivos de configuración de Maven
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Dar permisos de ejecución al Maven Wrapper
RUN chmod +x ./mvnw

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

# Copiar el código fuente
COPY src ./src

# Compilar la aplicación
RUN ./mvnw clean package -DskipTests

# Crear directorios necesarios
RUN mkdir -p /app/uploads/cv /app/logs

# Exponer el puerto
EXPOSE 8080

# Ejecutar la aplicación
CMD ["sh", "-c", "java -jar target/*.jar"]