package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VideoBookmarkRes {
    private Long id;
    private String title;
    private String thumbnail;
    private Long runtime;

    @Builder
    @QueryProjection
    public VideoBookmarkRes(Long id, String title, String thumbnail, Long runtime) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.runtime = runtime;
    }
}
