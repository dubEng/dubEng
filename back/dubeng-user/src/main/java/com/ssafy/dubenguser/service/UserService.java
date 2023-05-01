package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;

import java.util.List;

public interface UserService {
    public void addUser(UserJoinReq requestDTO);
    public boolean checkEnrolledMember(Long id);
    public boolean checkExistNickname(String nickname);
    public UserProfileRes findProfile(Long id);
    public UserCalendarRes findCalendar(Long userId);
    public List<UserRecordRes> findRecord(Long userId, UserRecordReq request);
    public List<RecordLikeRes> findRecordLike(Long userId, Boolean isLimit);
    public List<VideoBookmarkRes> findVideoBookmark(Long userId, Boolean isLimit);
}
