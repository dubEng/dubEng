package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.home.HomeDubKing;
import com.ssafy.dubengdublist.dto.home.HomePopularity;
import com.ssafy.dubengdublist.dto.home.HomeRank;
import com.ssafy.dubengdublist.dto.record.RecordScript;
import com.ssafy.dubengdublist.service.HomeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<?> selectAllHomePopularity(){
        List<HomePopularity> homePopularity = homeService.selectAllHomePopularity();
        return new ResponseEntity(homePopularity, HttpStatus.OK);
    }
    @ApiOperation(value = "홈 유저 랭킹")
    @GetMapping("/rank")
    public ResponseEntity<?> selectAllHomeRank(){
        List<HomeRank> homeRanks = homeService.selectAllHomeRank();
        return new ResponseEntity(homeRanks, HttpStatus.OK);
    }
    @ApiOperation(value = "홈 더빙왕 랭킹")
    @GetMapping("/dubking")
    public ResponseEntity<?> selectAllDubKing() {
        List<HomeDubKing> homeDubKings = homeService.selectAllHomeDubKing();
        return new ResponseEntity(homeDubKings, HttpStatus.OK);
    }
    
}
