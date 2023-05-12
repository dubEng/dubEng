package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.dubengdublist.dto.contents.ContentsScriptRes;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDetailScriptRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private ZonedDateTime createdDate;
    private Long recordCommentCount;
    private String userId;
    private String nickname;
    private Long recordId;
    private List<ContentsScriptRes> scriptList;
    private Long startTime;
    private Long endTime;


    @QueryProjection
    public CommunityDetailScriptRes(Long id, String title, String thumbnail,String videoPath, ZonedDateTime createdDate, Long recordCommentCount, String userId, String nickname,Long recordId, List<ContentsScriptRes> scriptList,Long startTime, Long endTime) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.recordCommentCount =recordCommentCount;
        this.userId = userId;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.recordId = recordId;
        this.scriptList = scriptList;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
