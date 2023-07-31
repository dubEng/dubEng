package com.ssafy.dubenguser.interceptor;

import com.ssafy.dubenguser.config.CookieHandler;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {
    private final AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("[preHandle]");
        // ATK 유효성 검사
        String accessToken = request.getHeader("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }

        // Get RTK
        String refreshToken = CookieHandler.getRefreshToken(request);

        try{
            authService.parseToken(accessToken);
        }catch(Exception e){
            accessToken = authService.reissueATK(refreshToken);
        }

        // 데이터 전달
        request.setAttribute("Authorization", accessToken);
        return true;
    }

//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        log.debug("[postHandle]");
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        log.debug("[afterCompletion]");
//    }
}
