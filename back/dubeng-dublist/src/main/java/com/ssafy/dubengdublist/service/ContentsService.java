package com.ssafy.dubengdublist.service;



import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsPlayCountRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;

public interface ContentsService {

    public HashMap<String, Object> findContentsRecommend(String langType, Pageable pageable);
    public Page<ContentsSearchRes> findContentsSearch(String langType, String title,Pageable pageable, List<Long> contentsSearch);
    public Page<ContentsDetailScriptRes> findContentsDetails(Pageable pageable, Long videoId);
    public Integer addContentsScrap(String userId, Long videoId);
    public boolean findContentsScrap(String userId, Long videoId);

}
