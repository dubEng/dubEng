package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentsServiceImpl implements ContentsService {

    private final VideoRepository videoRepository;

    @Transactional
    public HashMap<String, Object> SelectAllRecommend(String langType, Pageable pageable){
        Slice<ContentsRecommendRes> contentsRecommendSlice = videoRepository.findAllByLangType(langType, pageable);
        List<ContentsRecommendRes> ContentsRecommendList = contentsRecommendSlice.getContent().stream()
                .collect(Collectors.toList());
        HashMap<String, Object> result = new HashMap<>();
        result.put("ContentsRecommendList", ContentsRecommendList);
        result.put("hasNextPage", contentsRecommendSlice.hasNext());
        return result;
    }

    @Transactional
    public Page<ContentsSearchRes> SelectAllSearch(String langType, String title, Pageable pageable, List<Long> contentsSearch) {
        return videoRepository.selectAllContentsSearchRes(langType, title, pageable, contentsSearch);
    }

    @Transactional
    public Page<ContentsDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId) {
        return videoRepository.selectAllContentsDetailRes(langType, pageable, videoId);
    }

}
