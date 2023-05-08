package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalender;

import java.time.ZonedDateTime;
import java.util.List;

public interface UserRepositoryCustom {
    public List<Category> findCategoriesByUserId(String userId);
    public List<UserCalender> findCalenderByUserId(String userId, ZonedDateTime start, ZonedDateTime end);
    public List<UserRecordRes> findRecordByUserId(String userId, Boolean isPublic, Boolean isLimit, String lanType);
    public List<RecordLikeRes> findLikedRecordByUserId(String userId, Boolean isLimit, List<Long> recordIds);
    public List<VideoBookmarkRes> findBookmarkedVideoByUserId(String userId, Boolean isLimit, List<Long> videoIds);
}
