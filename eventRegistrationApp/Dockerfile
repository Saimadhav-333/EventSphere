# Build stage with verified Maven image
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage with verified JDK image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/eventRegistrationApp-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]