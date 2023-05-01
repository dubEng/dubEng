package com.ssafy.dubenguser.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserJoinReq {
    private String accessToken;
    private String refreshToken;
    private String email;
    private String nickname;
    private String description;
    private String landName;
    private List<String> categories;
}
