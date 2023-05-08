package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
@Data
@NoArgsConstructor
public class RecordLikeRes {
    private String title;
    private String thumbnail;
    private String nickname;
    private Long playCount;
//    private ZonedDateTime updatedDate;

    @Builder
    @QueryProjection
    public RecordLikeRes(String title, String thumbnail, String nickname, Long playCount) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.nickname = nickname;
        this.playCount = playCount;
//        this.updatedDate = updatedDate;
    }
}
