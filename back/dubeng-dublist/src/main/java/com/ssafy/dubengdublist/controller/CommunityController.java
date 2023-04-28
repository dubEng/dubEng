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
    public Page<CommunitySearchRes> SelectAllSearch(@PathVariable("langType") String  langType,  @RequestParam(required = false) String  title, Pageable pageable, @RequestParam(required = false) List<Long> contentsSearch){
        return communityService.SelectAllSearch(langType, title, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 더빙 작품 영상 자세히 보기")
    @GetMapping("/{langType}/detail/{videoId}")
    public Page<CommunityDetailScriptRes> SelectAllDetail(@PathVariable("langType") String  langType, Pageable pageable, @PathVariable Long videoId){
        return communityService.SelectAllDetail(langType, pageable, videoId);
    }


    @ApiOperation(value = "더빙한 작품 영상 댓글 보기")
    @GetMapping("/{langType}/comment/{recordId}")
    public Page<CommunityCommentRes> SelectAllDetailComment(@PathVariable("langType") String  langType, Pageable pageable, @PathVariable Long recordId){
        return communityService.SelectAllDetailComment(langType, pageable, recordId);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 쓰기")
    @PostMapping("/{langType}/comment/{recordId}")
    public ResponseEntity<?> insertDetailComment(@PathVariable("langType") String  langType, @RequestParam String userId, @PathVariable("recordId") Long recordId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.insertDetailComment(userId, recordId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 수정")
    @PutMapping("/{langType}/comment/{recordCommentId}")
    public ResponseEntity<?> updateDetailComment(@PathVariable("langType") String  langType, @RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.updateDetailComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 댓글 수정")
    @DeleteMapping("/{langType}/comment/{recordCommentId}")
    public ResponseEntity<?> deleteDetailComment(@PathVariable("langType") String  langType, @RequestParam String userId, @PathVariable("recordCommentId") Long recordCommentId, @RequestBody CommunityDetailCommentReq communityDetailCommentReq){
        return new ResponseEntity<Integer>(communityService.deleteDetailComment(userId, recordCommentId, communityDetailCommentReq), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "더빙한 작품 영상 좋아요")
    @PostMapping("/{langType}/like/{recordId}")
    public ResponseEntity<?> selectOneDetailLike(@PathVariable("langType") String  langType, @RequestParam String userId, @PathVariable("recordId") Long recordId){
        return new ResponseEntity<Integer>(communityService.selectOneDetailLike(userId, recordId), HttpStatus.ACCEPTED);
    }

}
