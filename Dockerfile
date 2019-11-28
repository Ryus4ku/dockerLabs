FROM java:8
VOLUME /tmp
ADD target/labs-0.0.1-SNAPSHOT.jar labs-0.0.1-SNAPSHOT.jar
RUN bash -c 'touch /labs-0.0.1-SNAPSHOT.jar'
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/labs-0.0.1-SNAPSHOT.jar"]