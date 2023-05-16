package com.ssafy.dubenguser.config;

import com.ssafy.dubenguser.exception.UnAuthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@Component
public class CookieHandler {
    public String getRefreshToken(HttpServletRequest request){
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if(cookies == null) throw new UnAuthorizedException("RTK 가져오는 과정에서 오류");
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("refreshToken")){
                refreshToken = cookie.getValue();
            }
        }
        log.debug("RTK : {}", refreshToken);
        return refreshToken;
    }
}
