package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.config.CookieHandler;
import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.service.UserMissionService;
import com.ssafy.dubenguser.service.UserMissionServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
@Api("도전과제 페이지 API")
public class MissionController {
    private final UserMissionService userMissionService;
    private final CookieHandler cookieHandler;

    @ApiOperation(value="도전과제 미션 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<List<UserMissionRes>>  userMissionList(@RequestHeader HttpHeaders headers, HttpServletRequest request){
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        List<UserMissionRes> result = userMissionService.findUserMissions(accessToken, refreshToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value="해결한 도전과제의 asset list 조회")
    @GetMapping("/asset")
    public ResponseEntity<List<String>>  userAssetList(@RequestHeader HttpHeaders headers, HttpServletRequest request){
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        List<String> result = userMissionService.findAssets(accessToken,refreshToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value="도전과제 완료 여부 확인")
    @GetMapping("/complete")
    public ResponseEntity<HashMap<String, Object>>  userAssetList(@RequestHeader HttpHeaders headers, HttpServletRequest request, @RequestParam Long videoId){
        String accessToken = headers.getFirst("Authorization");
        if(accessToken == null){
            throw new UnAuthorizedException("토큰 전달 방식에 오류");
        }
        String refreshToken = cookieHandler.getRefreshToken(request);

        HashMap<String, Object> result = userMissionService.findMissionComplete(accessToken, refreshToken, videoId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
