package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.community.CommunityDetailScriptRes;
import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.service.CommunityServiceImpl;
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
@Api("더빙 작품 API")
@RequestMapping(path="/community")
public class CommunityController {

    private final ContentsServiceImpl contentsService;
    private final CommunityServiceImpl communityService;

    @ApiOperation(value = "더빙왕 컨텐츠")
    @GetMapping("/{langType}/dubking")
    public ResponseEntity<?> SelectOneDubKing(@PathVariable("langType") String  langType, @RequestParam String userId){
        CommunityDubKingRes communityDubKingRes = communityService.SelectOneDubKing(langType, userId);
        return new ResponseEntity(communityDubKingRes, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙왕 컨텐츠 투표")
    @PostMapping("/dubking")
    public ResponseEntity<?> insertDubKing(@RequestParam String userId, @RequestParam String votedId){
        return new ResponseEntity<Integer>(communityService.insertDubKing(userId, votedId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "카테고리에서 검색한 더빙 작품 목록 불러오기")
    @GetMapping("/{langType}/search")
    public Page<CommunitySearchRes> SelectAllSearch(@PathVariable("langType") String  langType, Pageable pageable, @RequestParam List<Long> contentsSearch){
        return communityService.SelectAllSearch(langType, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 더빙 작품 영상 자세히 보기")
    @GetMapping("/{langType}/detail/{videoId}")
    public Page<CommunityDetailScriptRes> SelectAllDetail(@PathVariable("langType") String  langType, Pageable pageable, @PathVariable Long videoId){
        return communityService.SelectAllDetail(langType, pageable, videoId);
    }

}
