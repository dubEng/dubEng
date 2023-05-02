package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final RecordRepository recordRepository;

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

}
