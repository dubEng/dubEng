FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar

EXPOSE 9001

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
