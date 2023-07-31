package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDubKingRes {
    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    CommunityDubKingUserRes user1;
    CommunityDubKingUserRes user2;
    private Long startTime;
    private Long endTime;

    @QueryProjection
    public CommunityDubKingRes(Long id, String title, String thumbnail,String videoPath, CommunityDubKingUserRes user1, CommunityDubKingUserRes user2,Long startTime,Long endTime ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.user1 = user1;
        this.user2 = user2;
        this.startTime = startTime;
        this.endTime = endTime;
    }


}
