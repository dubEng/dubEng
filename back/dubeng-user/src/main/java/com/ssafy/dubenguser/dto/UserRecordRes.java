package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
@Data
@NoArgsConstructor
public class UserRecordRes {
    private Long id;
    private String title;
    private String thumbnail;
    private Long playCount;
    private ZonedDateTime updatedDate;
    @Builder
    @QueryProjection
    public UserRecordRes(Long id, String title, String thumbnail, Long playCount, ZonedDateTime updatedDate) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.playCount = playCount;
        this.updatedDate = updatedDate;
    }
}
