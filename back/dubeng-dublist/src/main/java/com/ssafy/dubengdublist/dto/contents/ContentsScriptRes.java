package com.ssafy.dubengdublist.dto.contents;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentsScriptRes {

    private Long startTime;
    private Long duration;
    private String content;
    private String translateContent;

    @QueryProjection
    public ContentsScriptRes(Long startTime, Long duration, String content,String translateContent) {
        this.startTime = startTime;
        this.duration = duration;
        this.content = content;
        this.translateContent = translateContent;
    }

}
