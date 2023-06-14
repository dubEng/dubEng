package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
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

    private final String MESSAGE = "존재하지 않는 유저입니다!";

    @Scheduled(fixedDelay = 300000, initialDelay = 1000)
    @Transactional
    public void addPlayCountFromRedis() {

        Set<String> redisKeys = redisTemplate.keys("recordPlayCnt*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long recordId = Long.parseLong(data.split("::")[1]);
            Object ovalue = redisTemplate.opsForValue().get(data);
            Long playCnt = 0L;
            if (ovalue != null)
                playCnt = Long.parseLong((String) ovalue);

            Optional<Record> orecord = recordRepository.findById(recordId);
            if (!orecord.isPresent()) {
                redisTemplate.delete(data);
            } else {
                recordRepository.updatePlayCount(recordId, playCnt);
            }
        }
    }

    @Scheduled(fixedDelay = 3600000, initialDelay = 15000)
    @Transactional
    public void updateLikeFromRedis() {
        recordLikeRepository.deleteAll();
        recordLikeRepository.flush();

        Set<String> redisKeys = redisTemplate.keys("like_userId*");
        Iterator<String> it = redisKeys.iterator();
        List<RecordLike> likeList = new ArrayList<>();
        while (it.hasNext()) {
            String data = it.next();
            String userId = data.split("::")[1]; // 유저 아이디들
            Set<Object> records = redisTemplate.opsForSet().members(data);

            Optional<User> ouser = userRepository.findById(userId);
            if (!ouser.isPresent()) {
                redisTemplate.delete(data);
            }
            User user = ouser.get();
            if (records.isEmpty()) return;
            for (Object o : records) {
                Long recordId = Long.parseLong((String) o);
                Optional<Record> orecord = recordRepository.findById(recordId);
                if (!orecord.isPresent()) {
                    redisTemplate.opsForSet().remove(data, o);
                } else {
                    Record record1 = orecord.get();
                    likeList.add(new RecordLike(user, record1, true));
                }
            }
        }
        recordLikeRepository.saveAll(likeList);
    }

    @Scheduled(fixedDelay = 3600000, initialDelay = 240000)
    @Transactional
    public void updateScrapFromRedis() {
        videoBookmarkRepository.deleteAll();
        videoBookmarkRepository.flush();
        em.flush();
        em.clear();
        Set<String> redisKeys = redisTemplate.keys("scrap_userId*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            String userId = data.split("::")[1]; // 유저 아이디들
            Set<Object> videos = redisTemplate.opsForSet().members(data);

            Optional<User> ouser = userRepository.findById(userId);
            if (!ouser.isPresent()) {
                redisTemplate.delete(data);
            } else {
                User user = ouser.get();
                for (Object ovideo : videos) {
                    Long videoId = Long.parseLong((String) ovideo);
                    Optional<Video> video1 = videoRepository.findById(videoId);
                    if (!video1.isPresent()) {
                        redisTemplate.opsForSet().remove(data, ovideo);
                    }
                    Video video = video1.get();
                    videoBookmarkRepository.save(new VideoBookmark(user, video, true));
                }
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void initVoteCount() {
        Set<String> voteCntKeys = redisTemplate.keys("vote_userId*");
        redisTemplate.delete(voteCntKeys);
    }

    //    @Scheduled(cron = "30 0 0 * * 1") // 매주 일요일 밤 자정 + 30초 갱신
    @Scheduled(cron = "30 0 0 * * *") // 모니터링용 initVoteCount랑 동시 실행 방지로 30초에 작동
    public void updateDubKing() {
        PriorityQueue<dubKingVote> priorityDubkingVotes = new PriorityQueue<>();

        dubKingRepository.deleteAll();
        dubKingRepository.flush();
        Set<String> redisKeys = redisTemplate.keys("dubKing_userId*");

        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String dubKingKey = "dubKingTop3";
        redisTemplate.delete(dubKingKey);  // 이전에 들어 있던 거 일단 지움.

        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            String userId = data.split("::")[1];
            Long voteCnt = Long.parseLong((String) redisTemplate.opsForValue().get(data));
            Optional<User> ouser = userRepository.findById(userId);
            if (!ouser.isPresent()) {
                redisTemplate.delete(data); // 해당 user 없으면 레디스에서 지움.
            } else {
                priorityDubkingVotes.add(new dubKingVote(userId, voteCnt));
            }
        }
        // pQ에 있는거 top3만 넣을거야
        for (int i = 0; i < 8; i++) {
            if(priorityDubkingVotes.isEmpty()) break;
            dubKingVote cur = priorityDubkingVotes.poll();
            String value = cur.userId+"::"+cur.voteCnt;
            setOperations.add(dubKingKey,value );
        }
    }

    static class dubKingVote implements Comparable<dubKingVote> {
        String userId;
        Long voteCnt;
        dubKingVote(String userId, Long voteCnt) {
            this.userId = userId;
            this.voteCnt = voteCnt;
        }
        @Override
        public int compareTo(dubKingVote o) {
            if (o.voteCnt - this.voteCnt >= 0L) {
                return 1;
            } else return 0;
        }
    }
}
