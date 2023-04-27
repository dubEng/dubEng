package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.CommunityDetailScriptRes;
import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommunityService {

    public CommunityDubKingRes SelectOneDubKing(String langType, String userId);
    public Integer insertDubKing(String userId,String votedId);
    public Page<CommunitySearchRes> SelectAllSearch(String langType, Pageable pageable, List<Long> contentsSearch);
    public Page<CommunityDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId);

}
