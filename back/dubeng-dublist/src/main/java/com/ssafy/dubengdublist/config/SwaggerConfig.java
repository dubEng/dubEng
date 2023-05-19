package com.ssafy.dubengdublist.config;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import com.fasterxml.classmate.TypeResolver;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

@EnableSwagger2
@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {

    private final TypeResolver typeResolver;

    private ApiInfo commonInfo() {
        return new ApiInfoBuilder()
                .title("Dubeng List REST API Server")
                .description("더빙 목록API")
                .version("2.0")
                .build();
    }

    @Bean
    public Docket allApi() {

        return new Docket(DocumentationType.SWAGGER_2)
                .alternateTypeRules(AlternateTypeRules
                        .newRule(typeResolver.resolve(Pageable.class), typeResolver.resolve(Page.class)))
//                .host("k8b208.p.ssafy.io")

                .groupName("list")
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.dubengdublist"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(commonInfo());
    }

    @Getter
    @Setter
    @ApiModel
    static class Page {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private String page;

        @ApiModelProperty(value = "페이지 크기", allowableValues="range[0, 100]")
        private String size;

    }
}