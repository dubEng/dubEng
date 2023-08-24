package com.ssafy.dubenguser.interceptor;

import com.ssafy.dubenguser.config.CookieHandler;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.GoogleAuthService;
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
    private final GoogleAuthService googleAuthService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // ATK 유효성 검사
        String headerValue = request.getHeader("Authorization");
        if(headerValue == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        // Kakao, Google 인지
        log.debug("[Interceptor] header Value : {}", headerValue);
        String accessToken = headerValue.substring(1, headerValue.length());

        String userId = "";
        try{
            if(headerValue.charAt(0) == 'k')
                userId = authService.parseToken(accessToken);
            else
                userId = googleAuthService.getGoogleUserId(accessToken);

        }catch(Exception e){
            // Get RTK
            String refreshToken = CookieHandler.getRefreshToken(request);
            accessToken = authService.reissueATK(refreshToken);

            userId = authService.parseToken(accessToken);
        }

        // 데이터 전달
//        request.setAttribute("method", arr[0]);
        request.setAttribute("userId", userId);
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
