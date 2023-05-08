package com.ssafy.dubengdublist.dto.record;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class RecordScriptPitchRes {

    private Long id;
    private Long startTime;
    private Long duration;
    private String content;
    private String translateContent;
    private List<Integer> pitch;

    @QueryProjection
    public RecordScriptPitchRes(Long id, Long startTime, Long duration, String content, String translateContent, List<Integer> pitch) {
        this.id = id;
        this.startTime = startTime;
        this.duration = duration;
        this.content = content;
        this.translateContent = translateContent;
        this.pitch = pitch;
    }

}
