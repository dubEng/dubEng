package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserLoginReq;
import com.ssafy.dubenguser.dto.UserLoginRes;

import java.util.HashMap;

public interface AuthService {
    HashMap<String, Object> findAccessToken(String code);
    String getKakaoImageUrl(String accessToken);
    UserLoginRes findUser(UserLoginReq request);
    String parseToken(String accessToken);
    Token requestRefresh(Token requestDTO);
}
