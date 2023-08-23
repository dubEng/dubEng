package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class GoogleOAuthUserInfo {
    private String id;
    private String email;
    private boolean verified_email;
    private String given_name;
    private String family_name;
    private String name;
    private String picture;
    private String locale;
}
