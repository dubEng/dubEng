package com.ssafy.dubenguser.controller;

import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.service.UserMissionService;
import com.ssafy.dubenguser.service.UserMissionServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
@Api("도전과제 페이지 API")
public class MissionController {
    private final UserMissionServiceImpl userMissionService;

    @ApiOperation(value="도전과제 미션 목록 조회")
    @GetMapping()
    public ResponseEntity<List<UserMissionRes>>  userMissionList(HttpServletRequest httpServletRequest){
        User user = (User) httpServletRequest.getAttribute("user");
        List<UserMissionRes> result = userMissionService.findUserMissions(user.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value="해결한 도전과제의 asset list 조회")
    @GetMapping("/asset")
    public ResponseEntity<List<String>>  userAssetList(HttpServletRequest httpServletRequest){
        User user = (User) httpServletRequest.getAttribute("user");
        List<String> result = userMissionService.findAssets(user.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
