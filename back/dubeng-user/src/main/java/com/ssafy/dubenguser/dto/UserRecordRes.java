package com.ssafy.dubenguser.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
@Data
@NoArgsConstructor
public class UserRecordRes {
    private String title;
    private String thumbnail;
    private Long playCount;
    private ZonedDateTime updatedDate;
    @Builder
    public UserRecordRes(String title, String thumbnail, Long playCount, ZonedDateTime updatedDate) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.playCount = playCount;
        this.updatedDate = updatedDate;
    }
}
