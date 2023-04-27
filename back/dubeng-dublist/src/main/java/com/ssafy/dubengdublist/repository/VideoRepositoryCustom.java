package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VideoRepositoryCustom {

    public Page<ContentsSearchRes> selectAllContentsSearchRes(String langType, Pageable pageable, List<Long> contentsSearch);

    public Page<ContentsDetailScriptRes> selectAllContentsDetailRes(String langType, Pageable pageable, Long videoId);

    public CommunityDubKingRes SelectOneDubKing(String langType, String userId);

    Page<CommunitySearchRes> selectAllCommunitySearchRes(String langType, Pageable pageable, List<Long> contentsSearch);

}
