package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.UserCategoryRes;

import java.util.List;

public interface UserRepositoryCustom {
    public List<UserCategoryRes> findCategoriesByUserId(Long userId);
}
