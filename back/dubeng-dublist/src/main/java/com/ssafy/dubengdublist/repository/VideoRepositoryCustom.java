package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.dto.community.CommunityCommentRes;
import com.ssafy.dubengdublist.dto.community.CommunityDetailScriptRes;
import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.dto.home.HomeDubKingRes;
import com.ssafy.dubengdublist.dto.home.HomePopularityRes;
import com.ssafy.dubengdublist.dto.home.HomeRankRes;
import com.ssafy.dubengdublist.dto.record.RecordScriptPitchRes;
import com.ssafy.dubengdublist.dto.record.RecordScriptRes;
import com.ssafy.dubengdublist.entity.RecordLike;
import com.ssafy.dubengdublist.entity.VideoBookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VideoRepositoryCustom {

    public Page<ContentsSearchRes> findByCategoryContents(String langType, String title, Pageable pageable, List<Long> contentsSearch);
    Page<CommunitySearchRes> findByCategoryCommunity(String langType, String  title, Pageable pageable, List<Long> contentsSearch);
    public Page<ContentsDetailScriptRes> findByAllContents(String langType, Pageable pageable, Long videoId);
    public Page<CommunityDetailScriptRes> findByAllCommunity(String langType, Pageable pageable, Long recordId);
    public CommunityDubKingRes findByOneDubKing(String langType, String userId);
    Page<CommunityCommentRes> findAllCommunityComment(Pageable pageable, Long recordId);
    public RecordLike findByRecordLike(Long recordId, String userId);
    public VideoBookmark findByVideoBookmark(Long videoId, String userId);

    // 여기는 녹음 상세 페이지     
//    public RecordVideo selectRecordVideo(Long videoId);
    List<RecordScriptPitchRes> findByRecordScript(Long videoId);
    
    // 여기는 홈 화면들
    List<HomePopularityRes> findAllHomePopularity();
    List<HomeRankRes> findAllHomeRank();
    List<HomeDubKingRes> findHomeDubKing();

}
