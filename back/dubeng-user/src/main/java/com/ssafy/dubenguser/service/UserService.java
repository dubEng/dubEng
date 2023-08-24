package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;

import java.util.List;

public interface UserService {

    public UserProfileRes findProfile(String userId);
    public UserCalendarRes findCalendar(String userId);
    public List<UserRecordRes> findRecord(UserRecordReq request);
    public List<RecordLikeRes> findRecordLike(String userId, Boolean isLimit, String langType);
    public List<VideoBookmarkRes> findVideoBookmark(String userId, Boolean isLimit, String langType);
}
