package com.ssafy.dubenguser.config;

import com.ssafy.dubenguser.interceptor.JwtInterceptor;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final AuthService authService;
    private final GoogleAuthService googleAuthService;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        List<String> missionList = Arrays.asList("/**/mission/*");
        List<String> authList = Arrays.asList("/**/auth/*");
        List<String> mypageList = Arrays.asList("/**/mypage/*", "/**/mypage/record/*");

        registry.addInterceptor(new JwtInterceptor(authService, googleAuthService))
                .addPathPatterns(missionList)   //EndPoint에 적용
                .addPathPatterns(mypageList)
                .addPathPatterns(authList)
                .excludePathPatterns("/**/mypage/profile", "/**/mypage/record/list")
                .excludePathPatterns("/**/auth/kakao", "/**/auth/check","/**/auth/google","/**/auth/interest");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }

}