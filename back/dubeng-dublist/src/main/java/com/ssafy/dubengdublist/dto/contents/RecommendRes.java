package com.ssafy.dubengdublist.dto.contents;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecommendRes {

    private Long id;
    private String title;
    private String thumbnail;

}
