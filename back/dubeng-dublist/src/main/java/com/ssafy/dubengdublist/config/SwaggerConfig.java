package com.ssafy.dubengdublist.config;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import com.fasterxml.classmate.TypeResolver;

import java.util.Collections;
import java.util.List;

@Configuration
public class SwaggerConfig {

    private final TypeResolver typeResolver;

    public SwaggerConfig(TypeResolver typeResolver) {
        this.typeResolver = typeResolver;
    }

    private ApiInfo commonInfo() {
        return new ApiInfoBuilder()
                .title("Dubeng List REST API Server")
                .description("더빙 목록API")
                .version("1.0")
                .build();
    }

    @Bean
    public Docket allApi() {
        Server serverLocal = new Server("local", "http://localhost:8080", "for local useages", Collections.emptyList(), Collections.emptyList());
        Server serverDev = new Server("dev", "https:k8b208.p.ssafy.io", "for Production useages", Collections.emptyList(), Collections.emptyList());

        return new Docket(DocumentationType.OAS_30)
                .alternateTypeRules(AlternateTypeRules
                        .newRule(typeResolver.resolve(Pageable.class), typeResolver.resolve(Page.class)))
                .groupName("list")
                .useDefaultResponseMessages(true)
                .servers(serverLocal, serverDev)
                .apiInfo(commonInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.dubengdublist"))
                .paths(PathSelectors.any())
                .build();
    }

    @Getter
    @Setter
    @ApiModel
    static class Page {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private String page;

        @ApiModelProperty(value = "페이지 크기", allowableValues="range[0, 100]")
        private String size;

        @ApiModelProperty(value = "정렬(사용법: 컬럼명,ASC|DESC)")
        private List<String> sort;
    }
}