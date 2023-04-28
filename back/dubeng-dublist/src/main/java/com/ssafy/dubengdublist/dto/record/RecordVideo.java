package com.ssafy.dubengdublist.dto.record;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecordVideo {

    private Long id;
    private String title;
    private String videoPath;
    private Long startTime;
    private Long endTime;

    @QueryProjection
    public RecordVideo(Long id, String title, String videoPath,Long startTime,Long endTime) {
        this.id = id;
        this.title = title;
        this.videoPath = videoPath;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
