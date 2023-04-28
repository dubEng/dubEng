package com.ssafy.dubengdublist.dto.home;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HomeRank {

    private String id;
    private String nickName;
    private String description;
    private String profileImage;
    private Long totalRecTime;
    private Long recordCount;

    @QueryProjection
    public HomeRank(String id, String nickName, String description,String profileImage, Long totalRecTime, Long recordCount) {
        this.id = id;
        this.nickName = nickName;
        this.description = description;
        this.profileImage = profileImage;
        this.totalRecTime = totalRecTime;
        this.recordCount = recordCount;
    }

}
