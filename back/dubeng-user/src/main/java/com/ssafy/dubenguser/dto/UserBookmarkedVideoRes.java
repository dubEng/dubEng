package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserBookmarkedVideoRes {
    private String title;
    private String thumbnail;

    @Builder
    @QueryProjection
    public UserBookmarkedVideoRes(String title, String thumbnail) {
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
