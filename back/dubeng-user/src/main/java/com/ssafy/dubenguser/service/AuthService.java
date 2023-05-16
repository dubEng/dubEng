package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserLoginReq;
import com.ssafy.dubenguser.dto.UserLoginRes;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

public interface AuthService {
    HashMap<String, Object> findAccessToken(String code);
    String getKakaoImageUrl(String accessToken);
    UserLoginRes findUser(String accessToken);
    String parseToken(String accessToken);
    Token requestRefresh(Token requestDTO);

    Set<String> getAttendanceByMonth(String accessToken, int month);

    void kakaoLogout();
}
