package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
@Data
@NoArgsConstructor
public class RecordLikeRes {
    private Long id;
    private String title;
    private String thumbnail;
    private String nickname;
    private Long playCount;
    private String userProfileImg;
    private ZonedDateTime updatedDate;

    @Builder
    @QueryProjection
    public RecordLikeRes(Long id, String title, String thumbnail, String nickname, Long playCount,String userProfileImg, ZonedDateTime updatedDate) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.nickname = nickname;
        this.playCount = playCount;
        this.userProfileImg = userProfileImg;
        this.updatedDate = updatedDate;
    }
}
