package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.MissionCompleteRes;
import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.*;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.repository.MissionRepository;
import com.ssafy.dubenguser.repository.UserMissionRepository;
import com.ssafy.dubenguser.repository.UserRepository;
import com.ssafy.dubenguser.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserMissionServiceImpl implements UserMissionService{
    private final UserRepository userRepository;
    private final UserMissionRepository userMissionRepository;
    private final VideoRepository videoRepository;
    private final MissionRepository missionRepository;

    @Override
    public List<UserMissionRes> findUserMissions(String userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }

        List<UserMissionRes> result = userMissionRepository.findUserMissionsByUser(user.get());
        return  result;
    }

    @Override
    public List<String> findAssets(String userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        List<String> result = userMissionRepository.findAssetsByUser(user.get());
        return result;
    }

    @Override
    @Transactional
    public HashMap<String, Object> findMissionComplete(String userId, Long videoId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        Optional<Video> video = videoRepository.findById(videoId);

        if(!video.isPresent()) {
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        Optional<Mission> omission = missionRepository.findByVideoId(videoId);
        if(!omission.isPresent()){
            throw new NotFoundException("미션이 없습니다!");
        }
        // 이미 완료 되었는지 확인
        Optional<UserMission> ouserMission = userMissionRepository.findByUserAndVideo(user.get(), video.get());
        if(!ouserMission.isPresent()){
            throw new NotFoundException("user mission 없습니다!");
        }
        UserMission userMission = ouserMission.get();
        HashMap<String, Object> result = new HashMap<>();
        if(userMission.getIsComplete()){ // 이미 완료 되었다
            result.put("message", "이미 완료된 미션입니다.");
            result.put("code",204);
        }else{
            Mission mission = omission.get();
            userMission.updateUserMissionComplete();
            userMissionRepository.save(userMission);
            result.put("message", "미션을 완료했습니다.");
            result.put("code",200);
            result.put("mission", new MissionCompleteRes(mission.getTitle(), mission.getAssets(), mission.getColor()));
        }
        return result;
    }


}
