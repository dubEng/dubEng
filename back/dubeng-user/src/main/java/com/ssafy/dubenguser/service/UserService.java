package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;

import java.util.List;

public interface UserService {
    public void addUser(UserJoinReq requestDTO, String id);
    public boolean checkEnrolledMember(String id);
    public boolean checkExistNickname(String nickname);
    public UserProfileRes findProfile(String accessToken);
    public UserCalendarRes findCalendar(String userId);
    public List<UserRecordRes> findRecord(String userId, UserRecordReq request);
    public List<RecordLikeRes> findRecordLike(String userId, Boolean isLimit);
    public List<VideoBookmarkRes> findVideoBookmark(String userId, Boolean isLimit);
}
