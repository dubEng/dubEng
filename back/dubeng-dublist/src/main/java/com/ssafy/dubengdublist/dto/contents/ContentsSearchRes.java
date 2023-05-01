package com.ssafy.dubengdublist.dto.contents;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentsSearchRes {

    private Long id;
    private String title;
    private String thumbnail;
    private Long runtime;

    @QueryProjection
    public ContentsSearchRes(Long id, String title, String thumbnail,Long runtime) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.runtime = runtime;
    }

}
