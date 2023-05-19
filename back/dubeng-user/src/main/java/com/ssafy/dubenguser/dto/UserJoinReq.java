package com.ssafy.dubenguser.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserJoinReq {
    private String nickname;
    private String kitchenName;
    private String introduce;
    private List<Long> categories;
    private Boolean gender;
    private String profileImgUrl;
}
