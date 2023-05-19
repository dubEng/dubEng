package com.ssafy.dubengdublist.dto.contents;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.dubengdublist.entity.Script;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ContentsDetailRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private Long startTime;
    private Long endTime;

    @QueryProjection
    public ContentsDetailRes(Long id, String title, String thumbnail,String videoPath,Long startTime,Long endTime) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
