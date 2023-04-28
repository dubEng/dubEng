package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.UserCalenderRes;
import com.ssafy.dubenguser.dto.UserProfileRes;
import com.ssafy.dubenguser.dto.UserRecordReq;
import com.ssafy.dubenguser.dto.UserRecordRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.service.UserServiceImpl;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping()
    public ResponseEntity<UserProfileRes> getUserProfile(HttpServletRequest httpServletRequest) {
        User user = (User) httpServletRequest.getAttribute("user");
        UserProfileRes result = userService.getProfile(user.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/calendar")
    public ResponseEntity<UserCalenderRes> getUserCalendar(HttpServletRequest httpServletRequest) {
        User user = (User) httpServletRequest.getAttribute("user");
        UserCalenderRes result = userService.getCalender(user.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/recordList")
    public ResponseEntity<List<UserRecordRes>> getUserRecordList(HttpServletRequest httpServletRequest, @RequestBody UserRecordReq request) {
        User user = (User) httpServletRequest.getAttribute("user");
        List<UserRecordRes> recordList = userService.getRecords(user.getId(), request);
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }
}
