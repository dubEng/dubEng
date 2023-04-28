package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;

import java.util.List;

public interface UserService {
    public void save(UserJoinReq requestDTO);
    public boolean checkEnrolledMember(Long id);
    public boolean isExistNickname(String nickname);
    public UserProfileRes getProfile(Long id);
    public UserCalenderRes getCalender(Long userId);
    public List<UserRecordRes> getRecords(Long userId, UserRecordReq request);
    public List<UserLikedRecordRes> getLikedRecords(Long userId);
}
