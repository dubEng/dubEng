package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommunityDetailRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;

    @QueryProjection
    public CommunityDetailRes(Long id, String title, String thumbnail,String videoPath) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
    }

}
