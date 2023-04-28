package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommunityService {

    public CommunityDubKingRes SelectOneDubKing(String langType, String userId);
    public Integer insertDubKing(String userId,String votedId);
    public Page<CommunitySearchRes> SelectAllSearch(String langType, String  title, Pageable pageable, List<Long> contentsSearch);
    public Page<CommunityDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId);
    public Page<CommunityCommentRes> SelectAllDetailComment(String langType, Pageable pageable, Long recordId);

    public Integer insertDetailComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq);
    public Integer updateDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq);

    public Integer deleteDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq);

    public Integer selectOneDetailLike(String userId, Long recordId);
}
