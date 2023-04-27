package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.UserCalenderRes;
import com.ssafy.dubenguser.dto.UserCategoryRes;

import java.time.ZonedDateTime;
import java.util.List;

public interface UserRepositoryCustom {
    public List<UserCategoryRes> findCategoriesByUserId(Long userId);
    public UserCalenderRes findCalenderByUserId(Long userId, ZonedDateTime start, ZonedDateTime end);
}
