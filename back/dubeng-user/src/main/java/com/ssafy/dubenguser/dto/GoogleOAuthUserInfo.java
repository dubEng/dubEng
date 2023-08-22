package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class GoogleOAuthUserInfo {
    private String id;
    private String email;
    private String name;
    private String imageUrl;

}
