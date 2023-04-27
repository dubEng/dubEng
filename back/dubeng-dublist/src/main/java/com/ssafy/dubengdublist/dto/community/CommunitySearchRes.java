package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
public class CommunitySearchRes {

    private Long id;
    private String title;
    private String thumbnail;
    private Long runtime;
    private String nickname;
    private Long playCount;
    private ZonedDateTime createdDate;

    @QueryProjection
    public CommunitySearchRes(Long id, String title, String thumbnail,Long runtime, String nickname, Long playCount, ZonedDateTime createdDate) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.runtime = runtime;
        this.nickname = nickname;
        this.playCount = playCount;
        this.createdDate = createdDate;
    }

}
