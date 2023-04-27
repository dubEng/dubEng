package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.UserProfileRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.service.UserServiceImpl;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;


@Slf4j
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping()
    public ResponseEntity<?> getUserProfile(HttpServletRequest httpServletRequest) {
        User user = (User) httpServletRequest.getAttribute("user");
        UserProfileRes result = userService.getProfile(user.getId());
        return new ResponseEntity<UserProfileRes>(result, HttpStatus.OK);
    }
}
