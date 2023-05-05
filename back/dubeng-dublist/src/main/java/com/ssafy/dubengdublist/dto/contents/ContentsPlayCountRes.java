package com.ssafy.dubengdublist.dto.contents;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentsPlayCountRes {
    private Long playCount;
    private Long likeCount;
    private boolean isLike;

    public ContentsPlayCountRes(Long playCount, Long likeCount, boolean isLike) {
        this.playCount = playCount;
        this.likeCount = likeCount;
        this.isLike = isLike;
    }
}
