package com.ssafy.dubenguser.controller;


import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.service.UserMissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
@Api("도전과제 페이지 API")
public class MissionController {
    private final UserMissionService userMissionService;

    @ApiOperation(value="해결한 도전과제 미션 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<List<UserMissionRes>> userMissionList(HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");

        List<UserMissionRes> result = userMissionService.findUserMissions(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value="해결한 도전과제의 asset list 조회")
    @GetMapping("/asset")
    public ResponseEntity<List<String>>  userAssetList(HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");

        List<String> result = userMissionService.findAssets(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value="도전과제 완료 여부 확인")
    @GetMapping("/complete")
    public ResponseEntity<HashMap<String, Object>>  userAssetList(HttpServletRequest request, @RequestParam Long videoId){
        String userId = (String) request.getAttribute("userId");

        HashMap<String, Object> result = userMissionService.findMissionComplete(userId, videoId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
