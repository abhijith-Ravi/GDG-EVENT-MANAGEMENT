# Base image with Java 21
FROM eclipse-temurin:21-jdk

# Working directory inside the container
WORKDIR /app

# Copy the generated JAR into the container
COPY target/*.jar app.jar

# Expose the Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]