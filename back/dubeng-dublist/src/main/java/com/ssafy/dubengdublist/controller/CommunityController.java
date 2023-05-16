package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.service.CommunityServiceImpl;
import com.ssafy.dubengdublist.service.ContentsServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Api("더빙 작품 API")
@RequestMapping(path="/community")
public class CommunityController {
    
    private final CommunityServiceImpl communityService;

    @ApiOperation(value = "더빙왕 컨텐츠")
    @GetMapping("/dubking/{langType}")
    public ResponseEntity<?> DubKingList(@PathVariable("langType") String  langType, @RequestParam String userId){
        Map<String, Object> result = communityService.findDubKing(langType, userId);
        return new ResponseEntity(result, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙왕 컨텐츠 투표")
    @PostMapping("/dubking")
    public ResponseEntity<?> DubKingAdd(@RequestParam String userId, @RequestParam String votedId){
        return new ResponseEntity<Integer>(communityService.addDubKing(userId, votedId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "카테고리에서 검색한 더빙 작품 목록 불러오기")
    @GetMapping("/search/{langType}")
    public Page<CommunitySearchRes> CommunitySearchList(@PathVariable("langType") String  langType,  @RequestParam(required = false) String  title, Pageable pageable, @RequestParam(required = false) List<Long> contentsSearch){
        return communityService.findCommunitySearch(langType, title, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 더빙 작품 영상 자세히 보기")
    @GetMapping("/detail/{recordId}")
    public Page<CommunityDetailScriptRes> CommunityDetails(Pageable pageable, @PathVariable Long recordId){
        return communityService.findCommunityDetail(pageable, recordId);
    }


    @ApiOperation(value = "더빙한 작품 영상 댓글 보기")
    @GetMapping("/comment/{recordId}")
    public Page<CommunityCommentRes> CommunityCommentList(Pageable pageable, @PathVariable Long recordId){
        return communityService.findCommunityComment(pageable, recordId);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 쓰기")
    @PostMapping("/comment/{recordId}")
    public ResponseEntity<?> CommunityCommentAdd(@RequestParam String userId, @PathVariable("recordId") Long recordId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.addCommunityComment(userId, recordId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 수정")
    @PutMapping("/comment/{recordCommentId}")
    public ResponseEntity<?> CommunityCommentModify(@RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.modifyCommunityComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 삭제")
    @DeleteMapping("/comment/{recordCommentId}")
    public ResponseEntity<?> CommunityCommentRemove(@RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.removeCommunityComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 좋아요")
    @PostMapping("/like/{recordId}")
    public ResponseEntity<?> CommunityLikeAdd(@RequestParam String userId, @PathVariable("recordId") Long recordId){
        return new ResponseEntity<Integer>(communityService.addCommunityLike(userId, recordId), HttpStatus.ACCEPTED);
    }
    @ApiOperation(value = "선택한 영상 콘텐츠 조회수 증가")
    @GetMapping("/playCount/{recordId}")
    public ResponseEntity<?> ContentPlayCount(@PathVariable("recordId") Long recordId, @RequestParam String userId){
        // 1. 레디스에 조회수 증가
        communityService.addPlayCntToRedis(recordId);
        // 2. 리턴으로 캐시에서 조회수, 좋아요 수, 좋아요 여부
        return new ResponseEntity<>(communityService.findPlayCounts(recordId, userId), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value="카테고리 리턴")
    @GetMapping("/category")
    public ResponseEntity<List<CommunityCategoryRes>> CategoryList(){
        return new ResponseEntity<>(communityService.findCategories(), HttpStatus.ACCEPTED);
    }
}
