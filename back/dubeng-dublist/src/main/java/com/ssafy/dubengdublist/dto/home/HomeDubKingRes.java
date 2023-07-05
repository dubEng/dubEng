package com.ssafy.dubengdublist.dto.home;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HomeDubKingRes{

    private Long id;
    private String userId;
    private String nickname;
    private String profileImage;
    private Long totalVote;

    @QueryProjection
    public HomeDubKingRes(Long id, String userId, String nickname, String profileImage, Long totalVote) {
        this.id = id;
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.totalVote = totalVote;
    }
}
