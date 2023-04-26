package com.ssafy.dubengdublist.service;



import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;

public interface ContentsService {

    public HashMap<String, Object> SelectAllRecommend(String langType, Pageable pageable);
    public Page<ContentsSearchRes> SelectAllSearch(String langType, Pageable pageable, List<Long> contentsSearch);
    public Page<ContentsDetailRes> SelectAllDetail(String langType, Pageable pageable, Long videoId);

}
