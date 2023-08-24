package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.GoogleAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Api("회원 API")
public class AuthController {
    private final AuthService authService;
    private final GoogleAuthService googleAuthService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private String unAuthorizedException = "토큰 전달 방식에 오류";

    @Value("${auth.redirectUrl}")
    private String SEND_REDIRECT_URL;

    @Value("${auth.baseUrl}")
    private String BASE_URL;

    @GetMapping("/kakao/callback")
    public void authCodeDetails(@RequestParam String code, HttpServletResponse response) throws IOException {

        //code로 access-token 요청
        HashMap<String, Object> result = authService.findAccessToken(code);

        String imageUrl = authService.getKakaoImageUrl((String) result.get("access_token"));

        Cookie cookie = new Cookie("accessToken", "k" + (String) result.get("access_token"));
        cookie.setMaxAge(3600);
        cookie.setDomain(BASE_URL);
        cookie.setPath("/");

        response.addCookie(cookie);

        Cookie rtkCookie = new Cookie("refreshToken", (String) result.get("refresh_token"));
        rtkCookie.setMaxAge(60 * 60 * 24 * 7 * 2);
        rtkCookie.setDomain(BASE_URL);
        rtkCookie.setPath("/");
        rtkCookie.setSecure(true);
        rtkCookie.setHttpOnly(true);

        response.addCookie(rtkCookie);

        //회원 가입 여부 체크
        String redirectUri = "/signup";
        if(authService.checkEnrolledMember((String) result.get("userId"))){
            redirectUri = "/login/success";
            response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
            return;
        }

        //토큰 쿠키 방식 적재
        Cookie imageUrlCookie = new Cookie("imageUrl", imageUrl);
        imageUrlCookie.setMaxAge(3600);
        imageUrlCookie.setDomain(BASE_URL);
        imageUrlCookie.setPath("/");
        response.addCookie(imageUrlCookie);

        response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
    }

    @PostMapping("/parse")
    public ResponseEntity<String> accessTokenParse(@RequestBody UserTokenReq requestDTO){
        log.debug("accessToken : {}", requestDTO.getAccessToken());

        //service - parseToken
        String userId = authService.parseToken(requestDTO.getAccessToken());

        return new ResponseEntity<String>(userId, HttpStatus.OK);
    }

    @PostMapping("/join")
    @ApiOperation(value = "회원가입하기")
    public ResponseEntity<String> userAdd(HttpServletRequest request, @RequestBody UserJoinReq userInfo){
        String userId = (String) request.getAttribute("userId");
        log.debug("userAdd : {}", request.toString());

        authService.addUser(userInfo, userId);

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }
    @PostMapping("/login")
    @ApiOperation(value = "회원정보 가져오기")
    public ResponseEntity<UserLoginRes> getLoginInfo(HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");

        //ATK을 이용하여 회원정보 요청
        UserLoginRes user = authService.findUser(userId);

        return new ResponseEntity<UserLoginRes>(user, HttpStatus.OK);
    }
    @GetMapping("/check/{nickname}")
    @ApiOperation(value = "닉네임 중복체크")
    public ResponseEntity<Boolean> duplicateNicknameCheck(@PathVariable String nickname){
        log.debug("nickname : {}", nickname);

        boolean check = authService.checkExistNickname(nickname);

        return new ResponseEntity<Boolean>(check, HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request){
        String method = (String) request.getAttribute("method");
        String userId = (String) request.getAttribute("userId");

        if(method.equals("kakao"))
            authService.kakaoLogout(userId);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/quit")
    public ResponseEntity<String> quit(HttpServletRequest request) {
        String method = (String) request.getAttribute("method");
        String userId = (String) request.getAttribute("userId");

        if(method.equals("kakao"))
            authService.quitUser(userId);

        return new ResponseEntity<String>("회원 탈퇴가 정상적으로 처리되었습니다!", HttpStatus.OK);
    }

    /**
     * Google Login
     */
    @GetMapping("/google/callback")
    public void googleLogin(String code, HttpServletResponse response) throws IOException {
        log.debug("Google Auth Code : {}", code);
        GoogleOAuthToken googleOAuthToken = googleAuthService.findAccessToken(code);

        Cookie atkCookie = new Cookie("accessToken", "g" + googleOAuthToken.getAccess_token());
        atkCookie.setMaxAge(3600);
        atkCookie.setDomain(BASE_URL);
        atkCookie.setPath("/");

        response.addCookie(atkCookie);

        Cookie rtkCookie = new Cookie("refreshToken", googleOAuthToken.getRefresh_token());
        rtkCookie.setMaxAge(60 * 60 * 24 * 7 * 2);
        rtkCookie.setDomain(BASE_URL);
        rtkCookie.setPath("/");
        rtkCookie.setSecure(true);
        rtkCookie.setHttpOnly(true);

        response.addCookie(rtkCookie);

        //회원 가입 여부 체크
        String redirectUri = "/signup";

        if(googleAuthService.isExistUser(googleOAuthToken.getAccess_token())){
            redirectUri = "/login/success";
            response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
            return;
        }
        // 없으면 회원가입
        // 구글 이미지 Cookie 적재
        Cookie imageUrlCookie = new Cookie("imageUrl", googleAuthService.getGoogleImageUrl(googleOAuthToken.getAccess_token()));
        imageUrlCookie.setMaxAge(3600);
        imageUrlCookie.setDomain(BASE_URL);
        imageUrlCookie.setPath("/");
        response.addCookie(imageUrlCookie);

        response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
    }
    @PostMapping("/google/token")
    public ResponseEntity<?> googleToken(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");

        String response = googleAuthService.parseGoogleToken(accessToken);
        return new ResponseEntity<String>(response, HttpStatus.OK);
    }
    /**
     * 관심사 목록 가져오는 컨트롤러 작성
     */
    @GetMapping("/interest")
    public ResponseEntity<List<Category>> getInterestList(){
        List<Category> categoryList = authService.getCategoryList();

        return new ResponseEntity<List<Category>>(categoryList, HttpStatus.OK);
    }
}
