package com.ssafy.dubenguser.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserProfileRes {
    private Long totalRecTime;
    private Long recordCount;
    private List<UserCategoryRes> category;

    @Builder
    public UserProfileRes(Long totalRecTime, Long recordCount, List<UserCategoryRes> category) {
        this.totalRecTime = totalRecTime;
        this.recordCount = recordCount;
        this.category = category;
    }
}
