package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.UserMission;

import java.util.HashMap;
import java.util.List;

public interface UserMissionService {

    public List<UserMissionRes> findUserMissions(String accessToken);
    public List<String> findAssets(String accessToken);
    //미션 완료 여부 확인
    public HashMap<String, Object> findMissionComplete(String accessToken, Long videoId);
}
