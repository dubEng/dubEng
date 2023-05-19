package com.ssafy.dubengdublist.service;



import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ContentsService {

    public Map<String, Object> findContentsRecommend(String langType, Pageable pageable);
    public Page<ContentsSearchRes> findContentsSearch(String langType, String title,Pageable pageable, List<Long> contentsSearch);
    public ContentsDetailScriptRes findContentsDetails(Long videoId);
    public Integer addContentsScrap(String userId, Long videoId);
    public boolean findContentsScrap(String userId, Long videoId);

}
