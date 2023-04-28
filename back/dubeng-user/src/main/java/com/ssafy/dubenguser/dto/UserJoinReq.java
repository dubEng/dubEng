package com.ssafy.dubenguser.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserJoinReq {
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private List<String> category;
}
