package com.ssafy.dubengdublist.dto.community;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommunityLikeRes {
    private Long likeCnt;
    private boolean isLike;

    public CommunityLikeRes(Long likeCnt, boolean isLike) {
        this.likeCnt = likeCnt;
        this.isLike = isLike;
    }
}
