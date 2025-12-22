# Stage 1: Build the Java application
# Use a lightweight JRE (Java Runtime Environment) base image
FROM eclipse-temurin:21-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from your host machine to the container's /app directory
# Replace 'your-project-name.jar' with the actual name of your generated JAR file
COPY target/simple-fullstack-app-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on (default is 8080)
EXPOSE 8080

# Define the command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]