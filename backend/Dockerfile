# Dockerfile para Spring Boot (backend/Dockerfile)

# Usar una imagen base de OpenJDK
FROM openjdk:21-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de Maven/Gradle
# Si usas Maven:
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Dar permisos de ejecución al Maven Wrapper
RUN chmod +x ./mvnw

# Si usas Gradle en lugar de Maven, usa estas líneas:
# COPY build.gradle .
# COPY gradle gradle
# COPY gradlew .
# RUN chmod +x ./gradlew

# Descargar dependencias (esto se hace primero para aprovechar el cache de Docker)
# Para Maven:
RUN ./mvnw dependency:go-offline -B

# Para Gradle:
# RUN ./gradlew build --no-daemon -x test

# Copiar el código fuente
COPY src ./src

# Compilar la aplicación
# Para Maven:
RUN ./mvnw clean package -DskipTests

# Para Gradle:
# RUN ./gradlew build -x test

# Exponer el puerto que usa Spring Boot (por defecto 8080)
EXPOSE 8080

# Ejecutar la aplicación
# Para Maven (buscar el JAR generado):
CMD ["sh", "-c", "java -jar target/*.jar"]

# Para Gradle:
# CMD ["java", "-jar", "build/libs/*.jar"]