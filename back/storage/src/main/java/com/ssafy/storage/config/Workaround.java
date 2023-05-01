package com.ssafy.storage.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.stereotype.Component;
import springfox.documentation.oas.web.OpenApiTransformationContext;
import springfox.documentation.oas.web.WebMvcOpenApiTransformationFilter;
import springfox.documentation.spi.DocumentationType;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Component
public class Workaround implements WebMvcOpenApiTransformationFilter {

    @Override
    public OpenAPI transform(OpenApiTransformationContext<HttpServletRequest> context) {
        OpenAPI openAPI = context.getSpecification();
        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost:9001");

        Server devServer = new Server();
        devServer.setDescription("production");
        devServer.setUrl("https://k8b208.p.ssafy.io");
        openAPI.setServers(Arrays.asList(localServer, devServer));

        return openAPI;
    }

    @Override
    public boolean supports(DocumentationType delimiter) {
        return delimiter.equals(DocumentationType.OAS_30);
    }
}
