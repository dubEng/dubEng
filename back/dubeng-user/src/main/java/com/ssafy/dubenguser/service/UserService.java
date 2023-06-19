package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;

import java.util.List;

public interface UserService {
    public void addUser(UserJoinReq requestDTO, String accessToken);
    public boolean checkEnrolledMember(String id);
    public boolean checkExistNickname(String nickname);
    public UserProfileRes findProfile(String accessToken);
    public UserCalendarRes findCalendar(String accessToken);
    public List<UserRecordRes> findRecord(UserRecordReq request);
    public List<RecordLikeRes> findRecordLike(String accessToken, Boolean isLimit, String langType);
    public List<VideoBookmarkRes> findVideoBookmark(String accessToken, Boolean isLimit, String langType);
}
