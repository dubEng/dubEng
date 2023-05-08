package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalender;

import java.time.ZonedDateTime;
import java.util.List;

public interface UserRepositoryCustom {
    public List<Category> findCategoriesByUserId(Long userId);
    public List<UserCalender> findCalenderByUserId(Long userId, ZonedDateTime start, ZonedDateTime end);
    public List<UserRecordRes> findRecordByUserId(Long userId, Boolean isPublic, Boolean isLimit, String lanType);
    public List<UserLikedRecordRes> findLikedRecordByUserId(Long userId, Boolean isLimit);
    public List<UserBookmarkedVideoRes> findBookmarkedVideoByUserId(Long userId, Boolean isLimit);
}
