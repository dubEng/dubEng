package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.service.ContentsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Api("더빙 컨텐츠 API")
@RequestMapping(path="/contents")
public class ContentsController {

    private final ContentsService contentsService;

    @ApiOperation(value = "00님이 좋아하실 영상")
    @GetMapping("/recommand/{langType}")
    public ResponseEntity<?> contentsRecommendList(@PathVariable("langType") String  langType, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        Map<String, Object> contentsRecommend= contentsService.findContentsRecommend(langType, pageRequest);
        List<ContentsRecommendRes> list = (List<ContentsRecommendRes>) contentsRecommend.get("ContentsRecommendList");
        Boolean hasNextPage = (Boolean) contentsRecommend.get("hasNextPage");
        HashMap<String, Object> resultMap = new HashMap<>();
        try{
            resultMap.put("ContentsRecommendList", list);
            resultMap.put("hasNextPage", hasNextPage);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("error", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }


    @ApiOperation(value = "검색 & 카테고리에서 콘텐츠 목록 불러오기")
    @GetMapping("/search/{langType}")
    public Page<ContentsSearchRes> contentsSearchList(@PathVariable("langType") String  langType, @RequestParam(required = false) String  title, Pageable pageable, @RequestParam(required = false) List<Long> contentsSearch){
        return contentsService.findContentsSearch(langType, title, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 콘텐츠 영상 자세히 보기")
    @GetMapping("/detail/{videoId}")
    public ContentsDetailScriptRes contentsDetails(@PathVariable Long videoId){
        return contentsService.findContentsDetails(videoId);
    }

    @ApiOperation(value = "콘텐츠 영상 스크랩")
    @PostMapping("/scrap/{videoId}")
    public ResponseEntity<?> contentsScrapAdd(@RequestParam String userId, @PathVariable("videoId") Long videoId){
        return new ResponseEntity<>(contentsService.addContentsScrap(userId, videoId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "콘텐츠 영상 스크랩 여부")
    @GetMapping("/isScrap/{videoId}")
    public ResponseEntity<?> contentsScrapFind(@RequestParam String userId, @PathVariable("videoId") Long videoId){
        return new ResponseEntity<>(contentsService.findContentsScrap(userId, videoId), HttpStatus.ACCEPTED);
    }

}
