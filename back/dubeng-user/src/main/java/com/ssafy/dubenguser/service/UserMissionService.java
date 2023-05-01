package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserMissionRes;

import java.util.List;

public interface UserMissionService {

    public List<UserMissionRes> findUserMissions(Long userId);
    public List<String> findAssets(Long userId);
}
