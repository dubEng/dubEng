package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class UserLoginReq {
    private String accessToken;
    private String refreshToken;
}
