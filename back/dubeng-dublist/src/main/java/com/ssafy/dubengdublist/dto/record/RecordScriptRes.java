package com.ssafy.dubengdublist.dto.record;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecordScriptRes {

    private Long id;
    private Long startTime;
    private Long duration;
    private String content;
    private String translateContent;
    private String pitch;

    @QueryProjection
    public RecordScriptRes(Long id, Long startTime, Long duration, String content, String translateContent, String pitch) {
        this.id = id;
        this.startTime = startTime;
        this.duration = duration;
        this.content = content;
        this.translateContent = translateContent;
        this.pitch = pitch;
    }

}
