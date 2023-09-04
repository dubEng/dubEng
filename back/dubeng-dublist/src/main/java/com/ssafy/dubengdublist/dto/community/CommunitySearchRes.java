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
    private String profileImage;
    private Long playCount;
    private ZonedDateTime updatedDate;
    private Long recordId;

    @QueryProjection
    public CommunitySearchRes(Long id, String title, String thumbnail,Long runtime, String nickname, String profileImage, Long playCount, ZonedDateTime updatedDate,Long recordId) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.runtime = runtime;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.playCount = playCount;
        this.updatedDate = updatedDate;
        this.recordId = recordId;
    }

}
