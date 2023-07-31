package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.home.HomeDubKingRes;
import com.ssafy.dubengdublist.dto.home.HomePopularityRes;
import com.ssafy.dubengdublist.dto.home.HomeRankRes;
import com.ssafy.dubengdublist.entity.User;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.UserRepository;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final RedisTemplate<String, Object> redisTemplate;


    public List<HomePopularityRes> findHomePopularity(){
        return videoRepository.findAllHomePopularity();
    }

    public List<HomeRankRes> findHomeRank(){
        return videoRepository.findAllHomeRank();
    }

    public List<HomeDubKingRes> findHomeDubKing(){
        List<HomeDubKingRes> result = new ArrayList<>();
        Set<String> redisKeys = redisTemplate.keys("dubKingTop3");
        Iterator<String> it = redisKeys.iterator();
        Long i = 0L;
        Set<Object> users = redisTemplate.opsForSet().members("dubKingTop3");

        for(Object o : users){
            String data = o.toString();
            String userId = data.split("::")[0];
            Long voteCnt = Long.parseLong(data.split("::")[1]);
            Optional<User> ouser = userRepository.findById(userId);
            if(!ouser.isPresent()){
                continue; // redis에는 있었는데 DB에는 없는 경우
            }
            User user = ouser.get();
            result.add(new HomeDubKingRes(i++, userId, user.getNickname(), user.getProfileImage(), voteCnt));
        }

        result.sort(HomeDubKingRes::compareTo);
        return result;

    }

}
