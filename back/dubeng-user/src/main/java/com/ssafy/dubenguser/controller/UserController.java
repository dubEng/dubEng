package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.UserServiceImpl;
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


@Slf4j
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
@Api("마이페이지 API")
public class UserController {
    private final UserServiceImpl userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "프로필 보여주기")
    @PostMapping("/profile")
    public ResponseEntity<UserProfileRes> userProfileDetails(@RequestBody UserProfileReq request) {
        String userId = request.getUserId();
        UserProfileRes result = userService.findProfile(userId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "캘린더 날짜 보여주기")
    @GetMapping("/calendar")
    public ResponseEntity<UserCalendarRes> userCalenderDetails(@RequestHeader HttpHeaders headers) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        UserCalendarRes result = userService.findCalendar(accessToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "더빙 목록 보여주기")
    @PostMapping("/record/list")
    public ResponseEntity<List<UserRecordRes>> userRecordList(@RequestHeader HttpHeaders headers, @RequestBody UserRecordReq request) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        List<UserRecordRes> recordList = userService.findRecord(accessToken, request);
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 누른 더빙 목록 보여주기")
    @GetMapping("/record/likes")
    public ResponseEntity<List<RecordLikeRes>> userRecordList(@RequestHeader HttpHeaders headers, @RequestParam Boolean isLimit) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        List<RecordLikeRes> recordList = userService.findRecordLike(accessToken, isLimit);
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }

    @ApiOperation(value = "북마크 비디오 보여주기")
    @GetMapping("/bookmark")
    public ResponseEntity<List<VideoBookmarkRes>> userBookmarkList(@RequestHeader HttpHeaders headers, @RequestParam Boolean isLimit) {
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        List<VideoBookmarkRes> bookmarkList = userService.findVideoBookmark(accessToken, isLimit);
        return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
    }
}
