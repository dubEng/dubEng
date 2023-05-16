package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.record.RecordScriptPitchRes;
import com.ssafy.dubengdublist.dto.record.RecordVideoRes;
import com.ssafy.dubengdublist.service.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api("더빙 하기 API")
@RequestMapping(path="/record")
public class RecordController {

    private final RecordService recordService;

    @ApiOperation(value = "더빙하기 비디오 보여주기")
    @GetMapping("/{videoId}")
    public ResponseEntity<?> RecordVideoList(@PathVariable("videoId") Long  videoId, @RequestParam String userId){
        RecordVideoRes recordVideoRes = recordService.findRecordVideo(videoId, userId);
        return new ResponseEntity(recordVideoRes, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙하기 자막 보여주기")
    @GetMapping("/script/{videoId}")
    public ResponseEntity<?> RecordScriptList(@PathVariable("videoId") Long  videoId){
        List<RecordScriptPitchRes> recordScriptRes = recordService.findRecordScript(videoId);
        return new ResponseEntity(recordScriptRes, HttpStatus.ACCEPTED);
    }


}
