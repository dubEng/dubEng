package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.CategoryRes;
import com.ssafy.dubenguser.dto.UserJoinReq;
import com.ssafy.dubenguser.dto.UserLoginRes;
import com.ssafy.dubenguser.dto.UserProfileReq;
import com.ssafy.dubenguser.entity.Category;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

public interface AuthService {
    HashMap<String, Object> findAccessToken(String code);
    String getKakaoImageUrl(String accessToken);
    String parseToken(String accessToken);
    Set<String> getAttendanceByMonth(String accessToken, int month);
    void kakaoLogout(String accessToken);
    String reissueATK(String refreshToken);
    UserLoginRes findUser(String userId, String accessToken);
    public void addUser(UserJoinReq requestDTO, String userId);
    public boolean checkEnrolledMember(String id);
    public boolean checkExistNickname(String nickname);
    public void quitUser(String id);

    public List<Category> getCategoryList();
}
