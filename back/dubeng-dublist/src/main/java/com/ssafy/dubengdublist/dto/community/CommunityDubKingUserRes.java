package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDubKingUserRes {

    private String id;
    private String nickname;
    private String profileImage;
    private String description;
    private String recordPath;

    @QueryProjection
    public CommunityDubKingUserRes(String id, String nickname, String profileImage, String description, String recordPath) {
        this.id = id;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.description = description;
        this.recordPath = recordPath;
    }


}
