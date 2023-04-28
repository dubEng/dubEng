package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.record.RecordScript;
import com.ssafy.dubengdublist.dto.record.RecordVideo;
import com.ssafy.dubengdublist.service.ContentsServiceImpl;
import com.ssafy.dubengdublist.service.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api("더빙 하기 API")
@RequestMapping(path="/record")
public class RecordController {

    private final RecordService recordService;

    @ApiOperation(value = "더빙하기 비디오 보여주기")
    @GetMapping("/{videoId}")
    public ResponseEntity<?> SelectRecordVideo(@PathVariable("videoId") Long  videoId){
        RecordVideo recordVideo = recordService.selectRecordVideo(videoId);
        return new ResponseEntity(recordVideo, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙하기 자막 보여주기")
    @GetMapping("/{videoId}/script")
    public ResponseEntity<?> SelectRecordScript(@PathVariable("videoId") Long  videoId){
        List<RecordScript> recordScript = recordService.selectRecordScript(videoId);
        return new ResponseEntity(recordScript, HttpStatus.ACCEPTED);
    }


}
