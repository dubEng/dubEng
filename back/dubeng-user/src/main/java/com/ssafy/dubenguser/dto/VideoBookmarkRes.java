package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VideoBookmarkRes {
    private String title;
    private String thumbnail;

    @Builder
    @QueryProjection
    public VideoBookmarkRes(String title, String thumbnail) {
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
