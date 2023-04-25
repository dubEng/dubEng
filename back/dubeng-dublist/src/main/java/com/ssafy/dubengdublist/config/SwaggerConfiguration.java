package com.ssafy.dubengdublist.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    private ApiInfo commonInfo() {
        return new ApiInfoBuilder()
                .title("목록 API")
                //.description("")
                //.license("leeys")
                //.licenseUrl("http://leeys.tistory.com")
                .version("1.0")
                .build();
    }

    @Bean
    public Docket allApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("list")
                .useDefaultResponseMessages(false)
                .select()
                //.apis(RequestHandlerSelectors.any())
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.dubengdublist.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(commonInfo());
    }
}