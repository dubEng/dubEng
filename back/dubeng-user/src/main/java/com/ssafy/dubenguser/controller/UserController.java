package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/kakao/callback")
    public void getAuthCode(@RequestParam String code, HttpServletResponse response) throws IOException {
        log.debug("auth code : {}", code);

        //code로 access-token 요청
        String redirectUri = userService.getAccessToken(code);

        response.sendRedirect("http://localhost:3000" + redirectUri);
    }

    @PostMapping("/parse/{token}")
    public ResponseEntity<String> parseAccessToken(@RequestBody String token){
        log.debug("accessToken : {}", token);


        return new ResponseEntity<String>("", HttpStatus.OK);
    }
}
