package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class UserTokenReq {
    private String accessToken;
    private String refreshToken;
}
