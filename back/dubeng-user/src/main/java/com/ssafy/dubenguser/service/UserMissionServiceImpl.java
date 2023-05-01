package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.repository.UserMissionRepository;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserMissionServiceImpl implements UserMissionService{
    private final UserRepository userRepository;
    private final UserMissionRepository userMissionRepository;


    @Override
    public List<UserMissionRes> findUserMissions(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }

        List<UserMissionRes> result = userMissionRepository.findUserMissionsByUser(user.get());
        return  result;
    }

    @Override
    public List<String> findAssets(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        List<String> result = userMissionRepository.findAssetsByUser(user.get());
        return result;
    }
}
