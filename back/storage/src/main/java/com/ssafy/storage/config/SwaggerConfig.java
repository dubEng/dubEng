package com.ssafy.storage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket restAPI(){
        Server serverLocal = new Server("local", "http://localhost:9001/recode", "for local useages", Collections.emptyList(), Collections.emptyList());
        Server serverDev = new Server("dev", "https:k8b208.p.ssafy.io/recode", "for Production useages", Collections.emptyList(), Collections.emptyList());


        return new Docket(DocumentationType.OAS_30)
                .servers(serverLocal, serverDev)
                .apiInfo(getApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.storage"))
                .paths(PathSelectors.any())
                .build();
    }
    private ApiInfo getApiInfo(){
        return new ApiInfoBuilder()
                .title("Dubeng Recode REST API Server")
                .version("v0.0.1")
                .description("사용자 더빙 녹음 파일 저장 API")
                .build();
    }
}
