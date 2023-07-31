package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.dubengdublist.dto.contents.ContentsScriptRes;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDetailRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private ZonedDateTime createdDate;
    private Long recordCommentCount;
    private Long recordLikeCount;
    private String userId;
    private String nickname;
    private Long recordId;
    private Long startTime;
    private Long endTime;
    private String recordPath;
    private String profileImage;

    @QueryProjection
    public CommunityDetailRes(Long id, String title, String thumbnail, String videoPath, ZonedDateTime createdDate, Long recordCommentCount, Long recordLikeCount,String userId, String nickname, Long recordId,Long startTime, Long endTime, String recordPath, String profileImage) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.recordCommentCount =recordCommentCount;
        this.recordLikeCount = recordLikeCount;
        this.userId = userId;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.recordId = recordId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.recordPath = recordPath;
        this.profileImage = profileImage;
    }

}
