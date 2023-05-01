package com.ssafy.dubengdublist.dto.home;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HomePopularityRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private String userId;
    private String nickname;
    private Long recordId;

    @QueryProjection
    public HomePopularityRes(Long id, String title, String thumbnail, String videoPath, String userId, String nickname, Long recordId) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.userId = userId;
        this.nickname = nickname;
        this.recordId = recordId;
    }

}
