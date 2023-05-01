package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserJoinReq;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @GetMapping("/kakao/callback")
    public void authCodeDetails(@RequestParam String code, HttpServletResponse response, RedirectAttributes attributes) throws IOException {
        log.debug("auth code : {}", code);

        //code로 access-token 요청
        HashMap<String, Object> result = authService.findAccessToken(code);

        //회원 가입 여부 체크
        String redirectUri = "/";
        if(!userService.checkEnrolledMember((Long) result.get("userId"))){
            redirectUri = "/join";
        }

        //토큰 POST 방식 적재
        attributes.addFlashAttribute("token", result);
        response.sendRedirect("http://localhost:3000" + redirectUri);
    }

    @PostMapping("/parse")
    public ResponseEntity<Long> accessTokenParse(@RequestBody Token requestDTO){
        log.debug("accessToken : {}", requestDTO.getAccessToken());

        //service - parseToken
        Long userId = authService.parseToken(requestDTO.getAccessToken());

        return new ResponseEntity<Long>(userId, HttpStatus.OK);
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
        Long userId = authService.parseToken(request.getAccessToken());

        if(userService.checkEnrolledMember(userId)){
            //이미 등록된 사용자 입니다.
        }
        userService.addUser(request);

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }
    @GetMapping("/check/{nickname}")
    @ApiOperation(value = "닉네임 중복체크")
    public ResponseEntity<Boolean> duplicateNicknameCheck(@PathVariable String nickname){
        log.debug("nickname : {}", nickname);

        boolean check = userService.checkExistNickname(nickname);

        return new ResponseEntity<Boolean>(check, HttpStatus.OK);
    }
}
