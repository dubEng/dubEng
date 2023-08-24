package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserMissionRes;

import java.util.HashMap;
import java.util.List;

public interface UserMissionService {

    public List<UserMissionRes> findUserMissions(String userId);
    public List<String> findAssets(String userId);
    //미션 완료 여부 확인
    public HashMap<String, Object> findMissionComplete(String userId, Long videoId);
}
