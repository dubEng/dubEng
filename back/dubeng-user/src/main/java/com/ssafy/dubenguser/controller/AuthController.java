package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserJoinReq;
import com.ssafy.dubenguser.dto.UserLoginReq;
import com.ssafy.dubenguser.dto.UserLoginRes;
import com.ssafy.dubenguser.exception.DuplicateException;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Api("회원 API")
public class AuthController {
    private final UserServiceImpl userService;
    private final AuthService authService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Value("${auth.redirectUrl}")
    private String SEND_REDIRECT_URL;

    @Value("${auth.baseUrl}")
    private String BASE_URL;

    @GetMapping("/kakao/callback")
    public void authCodeDetails(@RequestParam String code, HttpServletResponse response, RedirectAttributes attributes) throws IOException {
        log.debug("auth code : {}", code);

        //code로 access-token 요청
        HashMap<String, Object> result = authService.findAccessToken(code);

        String imageUrl = authService.getKakaoImageUrl((String) result.get("access_token"));

        Cookie cookie = new Cookie("accessToken", (String) result.get("access_token"));
        cookie.setMaxAge(3600);
        cookie.setDomain(BASE_URL);
        cookie.setPath("/");

        response.addCookie(cookie);

        //회원 가입 여부 체크
        String redirectUri = "/front/signup";
        if(userService.checkEnrolledMember((String) result.get("userId"))){
            redirectUri = "/front/login/success";
            response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
            return;
        }

        //토큰 쿠키 방식 적재
        Cookie cookie2 = new Cookie("imageUrl", imageUrl);
        cookie2.setMaxAge(3600);
        cookie2.setDomain(BASE_URL);
        cookie2.setPath("/");
        response.addCookie(cookie2);

        response.sendRedirect(SEND_REDIRECT_URL + redirectUri);
    }

    @PostMapping("/parse")
    public ResponseEntity<String> accessTokenParse(@RequestBody Token requestDTO){
        log.debug("accessToken : {}", requestDTO.getAccessToken());

        //service - parseToken
        String userId = authService.parseToken(requestDTO.getAccessToken());

        return new ResponseEntity<String>(userId, HttpStatus.OK);
    }
    @PostMapping("/refresh")
    public ResponseEntity<Token> refreshTokenRequest(@RequestBody Token requestDTO){
        log.debug("refreshToken : {}", requestDTO);

        //service - refresh
        Token responseDTO = authService.requestRefresh(requestDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    /**
     * 회원가입
     * 구현 안돼어있음.
     */
    @PostMapping("/join")
    @ApiOperation(value = "회원가입하기")
    public ResponseEntity<String> userAdd(@RequestBody UserJoinReq request){
        log.debug("userAdd : {}", request.toString());
        String userId = authService.parseToken(request.getAccessToken());
        if(userId == null) {
            throw new UnAuthorizedException("토큰을 가져올 수 없습니다!");
        }
        if(userService.checkEnrolledMember(userId)){
            throw new DuplicateException("이미 등록된 사용자입니다.");
        }
        userService.addUser(request, userId);

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }
    @PostMapping("/login")
    @ApiOperation(value = "회원정보 가져오기")
    public ResponseEntity<UserLoginRes> getLoginInfo(@RequestBody UserLoginReq request){
        log.debug("===로그인===");

        log.debug("ATK : {}", request);

        //ATK을 이용하여 회원정보 요청
        UserLoginRes user = authService.findUser(request);

        log.debug("loginUser : {}", user);
        return new ResponseEntity<UserLoginRes>(user, HttpStatus.OK);
    }
    @GetMapping("/check/{nickname}")
    @ApiOperation(value = "닉네임 중복체크")
    public ResponseEntity<Boolean> duplicateNicknameCheck(@PathVariable String nickname){
        log.debug("nickname : {}", nickname);

        boolean check = userService.checkExistNickname(nickname);

        return new ResponseEntity<Boolean>(check, HttpStatus.OK);
    }
}
