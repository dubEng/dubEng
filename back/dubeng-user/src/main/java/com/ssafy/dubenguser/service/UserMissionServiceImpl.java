package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.MissionCompleteRes;
import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.*;
import com.ssafy.dubenguser.exception.InvalidInputException;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserMissionServiceImpl implements UserMissionService{
    private final UserRepository userRepository;
    private final UserMissionRepository userMissionRepository;
    private final VideoMissionRepository videoMissionRepository;
    private final VideoRepository videoRepository;
    private final MissionRepository missionRepository;
    private String noUser = "존재하지 않는 유저입니다!";
    private String quitUser = "탈퇴한 회원입니다!";

    /**
     *  클리어한 도전과제 리스트 뽑기
     */
    @Override
    public List<UserMissionRes> findUserMissions(String userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException(noUser);
        }
        //미션 리스트 가져오기
        List<Mission> missionList = missionRepository.findAll();
        
        //사용자가 깬 도전과제 목록
        List<Long> list = userMissionRepository.findUserMissionsByUser(user.get());

        List<UserMissionRes> result = new ArrayList<>();
        for(Mission mission : missionList) {
            UserMissionRes missionRes = UserMissionRes.builder()
                    .title(mission.getTitle())
                    .assets(mission.getAssets())
                    .color(mission.getColor())
                    .isComplete(true)
                    .videoId(mission.getVideoId()).build();

            if(!list.contains(mission.getId())) missionRes.setComplete(false);
            result.add(missionRes);
        }
        return result;
    }

    @Override
    public List<String> findAssets(String userId) {

        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException(noUser);
        }

        if(!user.get().getIsActive()) {
            throw new InvalidInputException(quitUser);
        }

        List<String> result = userMissionRepository.findAssetsByUser(user.get());
        return result;
    }

    @Override
    @Transactional
    public HashMap<String, Object> findMissionComplete(String userId, Long videoId) {

        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException(noUser);
        }

        if(!user.get().getIsActive()) {
            throw new InvalidInputException(quitUser);
        }

        Optional<Video> video = videoRepository.findById(videoId);

        if(!video.isPresent()) {
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
//        Optional<Mission> omission = missionRepository.findById(videoId);
//        if(!omission.isPresent()){
//            throw new NotFoundException("미션이 없습니다!");
//        }
        //비디오에 매핑되어 있는 미션 찾기
        Optional<Mission> findMission = videoMissionRepository.findVideoMissionByVideo(video.get());
        Mission mission = findMission.get();

        // 이미 완료 되었는지 확인
        Optional<UserMission> ouserMission = userMissionRepository.findByUserAndVideo(user.get(), mission);

        HashMap<String, Object> result = new HashMap<>();
        if(ouserMission.isPresent()){ // 이미 완료 되었다
            result.put("message", "이미 완료된 미션입니다.");
            result.put("code",204);
        }else{
            UserMission userMission = UserMission.builder().user(user.get()).mission(mission).build();
            userMissionRepository.save(userMission);
            result.put("message", "미션을 완료했습니다.");
            result.put("code",200);
            result.put("mission", new MissionCompleteRes(mission.getTitle(), mission.getAssets(), mission.getColor()));
        }
        return result;
    }


}
