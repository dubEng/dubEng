package com.ssafy.dubengdublist.dto.record;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecordScript {

    private Long id;
    private Long startTime;
    private Long duration;
    private String content;
    private String translateContent;

    @QueryProjection
    public RecordScript(Long id, Long startTime, Long duration,String content,String translateContent) {
        this.id = id;
        this.startTime = startTime;
        this.duration = duration;
        this.content = content;
        this.translateContent = translateContent;
    }

}
