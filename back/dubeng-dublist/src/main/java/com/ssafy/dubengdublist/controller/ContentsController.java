package com.ssafy.dubengdublist.controller;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
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

    @ApiOperation(value = "00님이 좋아하실 영상")
    @GetMapping("/{langType}/recommand")
    public ResponseEntity<?> SelectAllRecommend(@PathVariable("langType") String  langType, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> ContentsRecommend= contentsService.SelectAllRecommend(langType, pageRequest);
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


    @ApiOperation(value = "카테고리에서 검색한 콘텐츠 목록 불러오기")
    @GetMapping("/{langType}/search")
    public Page<ContentsSearchRes> SelectAllSearch(@PathVariable("langType") String  langType, Pageable pageable, @RequestParam List<Long> contentsSearch){
        return contentsService.SelectAllSearch(langType, pageable, contentsSearch);
    }

    @ApiOperation(value = "선택한 콘텐츠 영상 자세히 보기")
    @GetMapping("/{langType}/detail/{videoId}")
    public Page<ContentsDetailRes> SelectAllDetail(@PathVariable("langType") String  langType, Pageable pageable, @PathVariable Long videoId){
        return contentsService.SelectAllDetail(langType, pageable, videoId);
    }

}
