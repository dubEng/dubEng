package com.ssafy.dubengdublist.dto.contents;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.dubengdublist.entity.Script;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ContentsDetailScriptRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private List<ContentsScriptRes> scriptList;
    private Long startTime;
    private Long endTime;

    @QueryProjection
    public ContentsDetailScriptRes(Long id, String title, String thumbnail,String videoPath, List<ContentsScriptRes> scriptList, Long startTime, Long endTime) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.scriptList = scriptList;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
