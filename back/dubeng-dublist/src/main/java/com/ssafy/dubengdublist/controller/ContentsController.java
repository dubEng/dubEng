package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.service.CommunityService;
import com.ssafy.dubengdublist.service.ContentsServiceImpl;
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


@RestController
@RequiredArgsConstructor
@Api("더빙 컨텐츠 API")
@RequestMapping(path="/contents")
public class ContentsController {

    private final ContentsServiceImpl contentsService;
    private final CommunityService communityService;

    @ApiOperation(value = "00님이 좋아하실 영상")
    @GetMapping("/recommand/{langType}")
    public ResponseEntity<?> ContentsRecommendList(@PathVariable("langType") String  langType, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> ContentsRecommend= contentsService.findContentsRecommend(langType, pageRequest);
        List<ContentsRecommendRes> list = (List<ContentsRecommendRes>) ContentsRecommend.get("ContentsRecommendList");
        Boolean hasNextPage = (Boolean) ContentsRecommend.get("hasNextPage");
        HashMap<String, Object> resultMap = new HashMap<>();
        try{
            resultMap.put("ContentsRecommendList", list);
            resultMap.put("hasNextPage", hasNextPage);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("error", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(resultMap, HttpStatus.ACCEPTED);
    }


    @ApiOperation(value = "검색 & 카테고리에서 콘텐츠 목록 불러오기")
    @GetMapping("/search/{langType}")
    public Page<ContentsSearchRes> ContentsSearchList(@PathVariable("langType") String  langType, @RequestParam(required = false) String  title,Pageable pageable, @RequestParam(required = false) List<Long> contentsSearch){
        return contentsService.findContentsSearch(langType, title, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 콘텐츠 영상 자세히 보기")
    @GetMapping("/detail/{langType}/{videoId}")
    public Page<ContentsDetailScriptRes> ContentsDetails(@PathVariable("langType") String  langType, Pageable pageable, @PathVariable Long videoId){
        return contentsService.findContentsDetails(langType, pageable, videoId);
    }

    @ApiOperation(value = "콘텐츠 영상 스크랩")
    @PostMapping("/scrap/{videoId}")
    public ResponseEntity<?> ContentsScrapAdd(@RequestParam String userId, @PathVariable("videoId") Long videoId){
        return new ResponseEntity<Integer>(contentsService.addContentsScrap(userId, videoId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "선택한 영상 콘텐츠 조회수 증가")
    @GetMapping("/playCount/{recordId}")
    public ResponseEntity<?> ContentPlayCount(@PathVariable("recordId") Long recordId, @RequestParam String userId){
        // 1. 레디스에 조회수 증가
        contentsService.addPlayCntToRedis(recordId);
        // 2. 리턴으로 캐시에서 조회수, 좋아요 수, 좋아요 여부
        return new ResponseEntity<>(contentsService.findPlayCounts(recordId, userId), HttpStatus.ACCEPTED);
    }
}
