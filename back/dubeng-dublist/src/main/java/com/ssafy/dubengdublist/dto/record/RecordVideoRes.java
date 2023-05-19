package com.ssafy.dubengdublist.dto.record;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecordVideoRes {

    private Long id;
    private String title;
    private String videoPath;
    private Long startTime;
    private Long endTime;
    private String langType;
    private Long totalRecordCount;
    private Long totalRecordTime;
    private Long runtime;

    @Builder
    public RecordVideoRes(Long id, String title, String videoPath, Long startTime, Long endTime, String langType,  Long totalRecordCount, Long totalRecordTime, Long runtime) {
        this.id = id;
        this.title = title;
        this.videoPath = videoPath;
        this.startTime = startTime;
        this.endTime = endTime;
        this.langType = langType;
        this.totalRecordCount = totalRecordCount;
        this.totalRecordTime = totalRecordTime;
        this.runtime = runtime;
    }

}
