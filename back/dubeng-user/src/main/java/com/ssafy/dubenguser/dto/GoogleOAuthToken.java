package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class GoogleOAuthToken {
    // JSON의 key값의 이름과 일치해야함
    private String access_token;
    private String expires_in;
    private String refresh_token;
    private String scope;
    private String token_type;
    private String id_token;
}
