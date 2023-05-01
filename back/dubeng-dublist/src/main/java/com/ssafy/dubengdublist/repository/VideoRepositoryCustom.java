package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.dto.community.CommunityCommentRes;
import com.ssafy.dubengdublist.dto.community.CommunityDetailScriptRes;
import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.dto.home.HomeDubKing;
import com.ssafy.dubengdublist.dto.home.HomePopularity;
import com.ssafy.dubengdublist.dto.home.HomeRank;
import com.ssafy.dubengdublist.dto.record.RecordScript;
import com.ssafy.dubengdublist.dto.record.RecordVideo;
import com.ssafy.dubengdublist.entity.RecordLike;
import com.ssafy.dubengdublist.entity.VideoBookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VideoRepositoryCustom {

    public Page<ContentsSearchRes> selectAllContentsSearchRes(String langType, String title, Pageable pageable, List<Long> contentsSearch);

    public Page<ContentsDetailScriptRes> selectAllContentsDetailRes(String langType, Pageable pageable, Long videoId);

    public CommunityDubKingRes SelectOneDubKing(String langType, String userId);

    Page<CommunitySearchRes> selectAllCommunitySearchRes(String langType, String  title, Pageable pageable, List<Long> contentsSearch);

    public Page<CommunityDetailScriptRes> selectAllCommunityDetailRes(String langType, Pageable pageable, Long videoId);

    Page<CommunityCommentRes> selectAllCommunityDetailCommentRes(Pageable pageable, Long recordId);
    public RecordLike selectOneRecordLike(Long recordId, String userId);
    public VideoBookmark selectOneVideoBookmark(Long videoId, String userId);

    // 여기는 녹음 상세 페이지     
//    public RecordVideo selectRecordVideo(Long videoId);
    List<RecordScript> selectRecordScript(Long videoId);
    
    // 여기는 홈 화면들
    List<HomePopularity> selectAllHomePopularity();
    List<HomeRank> selectAllHomeRank();
    List<HomeDubKing> selectAllHomeDubKing();

}
