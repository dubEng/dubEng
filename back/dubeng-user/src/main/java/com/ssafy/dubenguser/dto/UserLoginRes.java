package com.ssafy.dubenguser.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRes {
    private String userId;
    private String accessToken;
    private String nickname;
    private String imageUrl;
    private String kitchenName;
    @Builder
    public UserLoginRes(String userId, String accessToken, String nickname, String imageUrl, String kitchenName){
        this.userId = userId;
        this.accessToken = accessToken;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.kitchenName = kitchenName;
    }
}
