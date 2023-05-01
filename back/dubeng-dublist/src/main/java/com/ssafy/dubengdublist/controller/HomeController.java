package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.home.HomeDubKingRes;
import com.ssafy.dubengdublist.dto.home.HomePopularityRes;
import com.ssafy.dubengdublist.dto.home.HomeRankRes;
import com.ssafy.dubengdublist.service.HomeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api("홈 API")
@RequestMapping(path="/home")
public class HomeController {
    private final HomeService homeService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "홈 인기 더빙")
    @GetMapping("/popularity")
    public ResponseEntity<?> HomePopularityList(){
        List<HomePopularityRes> homePopularityRes = homeService.findHomePopularity();
        return new ResponseEntity(homePopularityRes, HttpStatus.OK);
    }
    @ApiOperation(value = "홈 유저 랭킹")
    @GetMapping("/rank")
    public ResponseEntity<?> HomeRankList(){
        List<HomeRankRes> homeRankRes = homeService.findHomeRank();
        return new ResponseEntity(homeRankRes, HttpStatus.OK);
    }
    @ApiOperation(value = "홈 더빙왕 랭킹")
    @GetMapping("/dubking")
    public ResponseEntity<?> DubKingList() {
        List<HomeDubKingRes> homeDubKingRes = homeService.findHomeDubKing();
        return new ResponseEntity(homeDubKingRes, HttpStatus.OK);
    }
    
}
