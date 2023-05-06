package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.Optional;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final RecordRepository recordRepository;
    private final RecordLikeRepository recordLikeRepository;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final VideoBookmarkRepository videoBookmarkRepository;

    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void addPlayCountFromRedis(){

        Set<String> redisKeys = redisTemplate.keys("recordPlayCnt*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            Long recordId = Long.parseLong(data.split("::")[1]);
            Long playCnt = Long.parseLong((String) redisTemplate.opsForValue().get(data));
            recordRepository.updatePlayCount(recordId, playCnt);
        }
    }

//    @Scheduled(fixedDelay = 5000)
    @Scheduled(fixedDelay = 3600000)
    @Transactional
    public void updateLikeFromRedis(){
        recordLikeRepository.deleteAll();
        Set<String> redisKeys = redisTemplate.keys("like_recordId*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            Long recordId = Long.parseLong(data.split("::")[1]); // 레코드 아이디
            Set<Object> users = redisTemplate.opsForSet().members(data);

            Optional<Record> orecord = recordRepository.findById(recordId);
            if(!orecord.isPresent()){
                throw new NotFoundException("존재하지 않는 녹음입니다!");
            }
            Record record = orecord.get();
            for(Object user : users){
                String userId = (String) user;
                Optional<User> ouser = userRepository.findById(userId);
                if(!ouser.isPresent()){
                    throw new NotFoundException("존재하지 않는 유저입니다!");
                }
                User u = ouser.get();
                recordLikeRepository.save(new RecordLike(u, record, true));
            }
        }
    }
    @Scheduled(fixedDelay = 3600000)
    @Transactional
    public void updateScrapFromRedis(){
        videoBookmarkRepository.deleteAll();
        Set<String> redisKeys = redisTemplate.keys("scrap_videoId*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            Long videoId = Long.parseLong(data.split("::")[1]); // 영상 아이디
            log.info("heeeeeeeeeeeeeeeeeeeeeeer: {} ", videoId);
            Set<Object> users = redisTemplate.opsForSet().members(data);

            Optional<Video> ovideo = videoRepository.findById(videoId);
            if(!ovideo.isPresent()){
                throw new NotFoundException("존재하지 않는 비디오입니다!");
            }
            Video video = ovideo.get();
            for(Object user : users){
                String userId = (String) user;
                Optional<User> ouser = userRepository.findById(userId);
                if(!ouser.isPresent()){
                    throw new NotFoundException("존재하지 않는 유저입니다!");
                }
                User u = ouser.get();
                videoBookmarkRepository.save(new VideoBookmark(u, video, true));
            }
        }
    }
}
