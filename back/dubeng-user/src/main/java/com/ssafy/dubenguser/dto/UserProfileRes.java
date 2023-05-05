package com.ssafy.dubenguser.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserProfileRes {
    private String nickname;
    private String description;
    private String profileImage;
    private Long totalRecTime;
    private Long recordCount;
    private List<UserCategoryRes> category;

    @Builder
    public UserProfileRes(String nickname, String description, String profileImage, Long totalRecTime, Long recordCount, List<UserCategoryRes> category) {
        this.nickname = nickname;
        this.description = description;
        this.profileImage = profileImage;
        this.totalRecTime = totalRecTime;
        this.recordCount = recordCount;
        this.category = category;
    }
}
