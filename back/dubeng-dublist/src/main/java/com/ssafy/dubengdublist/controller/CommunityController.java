package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.service.CommunityService;
import com.ssafy.dubengdublist.service.CommunityServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Api("더빙 작품 API")
@RequestMapping(path="/community")
public class CommunityController {

    private final CommunityService communityService;

    @ApiOperation(value = "더빙왕 컨텐츠")
    @GetMapping("/dubking/{langType}")
    public ResponseEntity<Map<String, Object>> dubKingList(@PathVariable("langType") String  langType, @RequestParam String userId){
        Map<String, Object> result = communityService.findDubKing(langType, userId);
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙왕 컨텐츠 투표")
    @PostMapping("/dubking")
    public ResponseEntity<?> dubKingAdd(@RequestParam String userId, @RequestParam String votedId){
        return new ResponseEntity<>(communityService.addDubKing(userId, votedId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "카테고리에서 검색한 더빙 작품 목록 불러오기")
    @GetMapping("/search/{langType}")
    public Page<CommunitySearchRes> communitySearchList(@PathVariable("langType") String  langType, @RequestParam(required = false) String  title, Pageable pageable, @RequestParam(required = false) List<Long> contentsSearch){
        return communityService.findCommunitySearch(langType, title, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 더빙 작품 영상 자세히 보기")
    @GetMapping("/detail/{recordId}")
    public CommunityDetailScriptRes communityDetails(@PathVariable Long recordId){
        return communityService.findCommunityDetail(recordId);
    }
    @ApiOperation(value = "숏츠 더빙 작품")
    @GetMapping("/shorts")
    public Page<CommunityDetailScriptRes> communityShorts(Pageable pageable){
        return communityService.findCommunityShorts(pageable);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 보기")
    @GetMapping("/comment/{recordId}")
    public Page<CommunityCommentRes> communityCommentList(Pageable pageable, @PathVariable Long recordId){
        return communityService.findCommunityComment(pageable, recordId);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 쓰기")
    @PostMapping("/comment/{recordId}")
    public ResponseEntity<?> communityCommentAdd(@RequestParam String userId, @PathVariable("recordId") Long recordId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<>(communityService.addCommunityComment(userId, recordId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 수정")
    @PutMapping("/comment/{recordCommentId}")
    public ResponseEntity<?> communityCommentModify(@RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<>(communityService.modifyCommunityComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 삭제")
    @DeleteMapping("/comment/{recordCommentId}")
    public ResponseEntity<?> communityCommentRemove(@RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<>(communityService.removeCommunityComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 좋아요")
    @PostMapping("/like/{recordId}")
    public ResponseEntity<?> communityLikeAdd(@RequestParam String userId, @PathVariable("recordId") Long recordId){
        return new ResponseEntity<>(communityService.addCommunityLike(userId, recordId), HttpStatus.ACCEPTED);
    }
    @ApiOperation(value = "선택한 영상 콘텐츠 조회수 증가")
    @GetMapping("/viewCount/{recordId}")
    public ResponseEntity<?> contentPlayCount(@PathVariable("recordId") Long recordId){
        return new ResponseEntity<>(communityService.addPlayCntToRedis(recordId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "선택한 영상의 좋아요 여부와 좋아요 수")
    @GetMapping("/likeInfo/{recordId}")
    public ResponseEntity<CommunityLikeRes> communityLikeFind(@RequestParam String userId, @PathVariable("recordId") Long recordId){
        return new ResponseEntity<>(communityService.findLikeInfo(recordId, userId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "기존 조회수 증가 API 리턴으로 조회수, 좋아요 수, 좋아요 여부 리턴")
    @GetMapping("/playCount/{recordId}")
    public ResponseEntity<?> contentPlayCount(@PathVariable("recordId") Long recordId, @RequestParam String userId){
        // 1. 레디스에 조회수 증가
        communityService.addPlayCntToRedis(recordId);
        // 2. 리턴으로 캐시에서 조회수, 좋아요 수, 좋아요 여부
        return new ResponseEntity<>(communityService.findPlayCounts(recordId, userId), HttpStatus.ACCEPTED);
    }


    @ApiOperation(value="카테고리 리턴")
    @GetMapping("/category")
    public ResponseEntity<List<CommunityCategoryRes>> categoryList(){
        return new ResponseEntity<>(communityService.findCategories(), HttpStatus.ACCEPTED);
    }
}
