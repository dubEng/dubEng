package com.ssafy.dubengdublist.dto.contents;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentsRecommendRes {

    private Long id;
    private String title;
    private String thumbnail;

    public ContentsRecommendRes(Long id, String title, String thumbnail) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
