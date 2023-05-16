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

import javax.persistence.EntityManager;
import java.util.*;

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
    private final DubKingRepository dubKingRepository;
    private final EntityManager em;
    @Scheduled(fixedDelay = 300000, initialDelay = 1000)
    @Transactional
    public void addPlayCountFromRedis(){

        Set<String> redisKeys = redisTemplate.keys("recordPlayCnt*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            Long recordId = Long.parseLong(data.split("::")[1]);
            Object ovalue = redisTemplate.opsForValue().get(data);
            Long playCnt = 0L;
            if(ovalue!=null)
                playCnt = Long.parseLong((String)ovalue);

            Optional<Record> orecord = recordRepository.findById(recordId);
            if(!orecord.isPresent()){
                throw new NotFoundException("존재하지 않는 녹음입니다!");
            }
            recordRepository.updatePlayCount(recordId, playCnt);
        }
    }

    @Scheduled(fixedDelay = 3600000, initialDelay = 15000)
    @Transactional
    public void updateLikeFromRedis(){
        recordLikeRepository.deleteAll();
        recordLikeRepository.flush();

        Set<String> redisKeys = redisTemplate.keys("like_userId*");
        Iterator<String> it = redisKeys.iterator();
        List<RecordLike> likeList = new ArrayList<>();
        while(it.hasNext()){
            String data = it.next();
            String userId = data.split("::")[1]; // 유저 아이디들
            Set<Object> records = redisTemplate.opsForSet().members(data);

            Optional<User> ouser = userRepository.findById(userId);
            if(!ouser.isPresent()){
                throw new NotFoundException("존재하지 않는 유저입니다!");
            }
            User user = ouser.get();
            if(records.isEmpty()) return;
            for(Object record : records){
                Long recordId = Long.parseLong((String) record);
                Optional<Record> orecord = recordRepository.findById(recordId);
                if(!orecord.isPresent()){
                    throw new NotFoundException("존재하지 않는 녹음입니다!");
                }
                Record record1 = orecord.get();
                likeList.add(new RecordLike(user, record1, true));
            }
        }
        recordLikeRepository.saveAll(likeList);
    }
    @Scheduled(fixedDelay = 3600000, initialDelay = 240000)
    @Transactional
    public void updateScrapFromRedis(){
        videoBookmarkRepository.deleteAll();
        videoBookmarkRepository.flush();
        em.flush();
        em.clear();
        Set<String> redisKeys = redisTemplate.keys("scrap_userId*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            String userId = data.split("::")[1]; // 유저 아이디들
            log.info("heeeeeeeeeeeeeeeeeeeeeeer: {} ", userId);
            Set<Object> videos = redisTemplate.opsForSet().members(data);

            Optional<User> ouser = userRepository.findById(userId);
            if(!ouser.isPresent()){
                throw new NotFoundException("존재하지 않는 유저입니다!");
            }
            User user = ouser.get();
            for(Object ovideo : videos){
                Long videoId = Long.parseLong((String) ovideo);
                Optional<Video> video1 = videoRepository.findById(videoId);
                if(!ouser.isPresent()){
                    throw new NotFoundException("존재하지 않는 비디오입니다!");
                }
                Video video = video1.get();
                videoBookmarkRepository.save(new VideoBookmark(user, video, true));
            }
        }
    }
    // 매일 자정 갱신
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void deleteVoteCnt(){
        Set<String> redisKeys = redisTemplate.keys("vote_userId*");
        redisTemplate.delete(redisKeys);
    }

    // 매주 월요일 자정 업데이트 -> 일단 목요일로 변경
    @Scheduled(cron = "0 0 0 * * 4")
    public void updateDubKing(){
        dubKingRepository.deleteAll();
        dubKingRepository.flush();
        Set<String> redisKeys = redisTemplate.keys("dubKing_userId*");
        Iterator<String> it = redisKeys.iterator();
        while(it.hasNext()){
            String data = it.next();
            String userId = data.split("::")[1];
            Long voteCnt = Long.parseLong((String) redisTemplate.opsForValue().get(data));
            Optional<User> ouser = userRepository.findById(userId);
            if(!ouser.isPresent()){
                throw new NotFoundException("존재하지 않는 유저입니다!");
            }
            User user = ouser.get();
            dubKingRepository.save(new DubKing(user, voteCnt, true));
        }
    }

    @Transactional
    public void deleteLikeTable(){
        recordLikeRepository.deleteAll();
        em.flush();
        em.clear();

    }
}
