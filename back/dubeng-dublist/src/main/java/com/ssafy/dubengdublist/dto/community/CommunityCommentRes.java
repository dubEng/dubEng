package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
public class CommunityCommentRes {

    private String nickName;
    private String content;
    private ZonedDateTime updatedDate;

    @QueryProjection
    public CommunityCommentRes(String nickName, String content, ZonedDateTime updatedDate){
        this.nickName = nickName;
        this.content = content;
        this.updatedDate = updatedDate;
    }

}
