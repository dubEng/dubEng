package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDetailCommentReq {

    private String userId;
    private String content;

    @QueryProjection
    public CommunityDetailCommentReq(String userId, String content){
        this.userId = userId;
        this.content = content;
    }

}
