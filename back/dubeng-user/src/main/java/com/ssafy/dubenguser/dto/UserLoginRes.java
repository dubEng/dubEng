package com.ssafy.dubenguser.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRes {
    private String userId;
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private String imageUrl;

    @Builder
    public UserLoginRes(String userId, String accessToken, String refreshToken, String nickname, String imageUrl){
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.nickname = nickname;
        this.imageUrl = imageUrl;

    }
}
