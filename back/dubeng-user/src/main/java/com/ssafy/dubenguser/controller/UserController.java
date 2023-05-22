package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.config.CookieHandler;
import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.AuthService;
import com.ssafy.dubenguser.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;


@Slf4j
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
@Api("마이페이지 API")
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    private final CookieHandler cookieHandler;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private String unAuthorizedException = "토큰 전달 방식에 오류";
    @ApiOperation(value = "프로필 보여주기")
    @PostMapping("/profile")
    public ResponseEntity<UserProfileRes> userProfileDetails(@RequestBody UserProfileReq request) {
        String userId = request.getUserId();
        UserProfileRes result = userService.findProfile(userId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "캘린더 날짜 보여주기")
    @GetMapping("/calendar")
    public ResponseEntity<UserCalendarRes> userCalenderDetails(@RequestHeader HttpHeaders headers, HttpServletRequest request) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException(unAuthorizedException);
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        UserCalendarRes result = userService.findCalendar(accessToken, refreshToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "더빙 목록 보여주기")
    @PostMapping("/record/list")
    public ResponseEntity<List<UserRecordRes>> userRecordList(@RequestBody UserRecordReq request) {
        List<UserRecordRes> recordList = userService.findRecord(request);
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 누른 더빙 목록 보여주기")
    @GetMapping("/record/likes")
    public ResponseEntity<List<RecordLikeRes>> userRecordList(@RequestHeader HttpHeaders headers, HttpServletRequest request,@RequestParam Boolean isLimit, @RequestParam String langType) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException(unAuthorizedException);
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        List<RecordLikeRes> recordList = userService.findRecordLike(accessToken, refreshToken, isLimit, langType);
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }

    @ApiOperation(value = "북마크 비디오 보여주기")
    @GetMapping("/bookmark")
    public ResponseEntity<List<VideoBookmarkRes>> userBookmarkList(@RequestHeader HttpHeaders headers, HttpServletRequest request, @RequestParam Boolean isLimit, @RequestParam String langType) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException(unAuthorizedException);
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        List<VideoBookmarkRes> bookmarkList = userService.findVideoBookmark(accessToken, refreshToken, isLimit, langType);
        return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
    }
    @GetMapping("/attendance")
    @ApiOperation(value = "출석 정보 확인하기")
    public ResponseEntity<?> getAttendance(@RequestHeader HttpHeaders headers, HttpServletRequest request, @RequestParam int month){
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException(unAuthorizedException);
        }

        String refreshToken = cookieHandler.getRefreshToken(request);

        Set<String> dateList = authService.getAttendanceByMonth(accessToken, refreshToken, month);

        return new ResponseEntity<Set<String>>(dateList, HttpStatus.OK);
    }
}
