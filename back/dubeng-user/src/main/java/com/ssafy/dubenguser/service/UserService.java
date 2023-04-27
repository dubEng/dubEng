package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserJoinReq;
import com.ssafy.dubenguser.dto.UserProfileRes;

public interface UserService {
    public void save(UserJoinReq requestDTO);
    public boolean checkEnrolledMember(Long id);
    public boolean isExistNickname(String nickname);
    public UserProfileRes getProfile(Long id);

}
