package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.GoogleOAuthToken;


public interface GoogleAuthService {
    GoogleOAuthToken findAccessToken(String code);
    String parseGoogleToken(String accessToken);
    boolean isExistUser(String accessToken);

    String getGoogleImageUrl(String accessToken);
}
