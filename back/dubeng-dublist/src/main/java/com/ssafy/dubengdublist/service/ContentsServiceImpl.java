package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.contents.*;
import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentsServiceImpl implements ContentsService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final VideoBookmarkRepository videoBookmarkRepository;
    private final RecordRepository recordRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Transactional
    public HashMap<String, Object> findContentsRecommend(String langType, Pageable pageable){
        Slice<ContentsRecommendRes> contentsRecommendSlice = videoRepository.findAllByLangType(langType, pageable);
        List<ContentsRecommendRes> ContentsRecommendList = contentsRecommendSlice.getContent().stream()
                .collect(Collectors.toList());
        HashMap<String, Object> result = new HashMap<>();
        result.put("ContentsRecommendList", ContentsRecommendList);
        result.put("hasNextPage", contentsRecommendSlice.hasNext());
        return result;
    }

    @Transactional
    public Page<ContentsSearchRes> findContentsSearch(String langType, String title, Pageable pageable, List<Long> contentsSearch) {
//        for(Long c : contentsSearch){
//            Optional<Category> category = categoryRepository.findById(c);
//            if(!category.isPresent()){
//                throw new NotFoundException("존재하지 않는 카테고리입니다!");
//            }
//        }
        return videoRepository.findByCategoryContents(langType, title, pageable, contentsSearch);
    }

    @Transactional
    public Page<ContentsDetailScriptRes> findContentsDetails(String langType, Pageable pageable, Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        return videoRepository.findByAllContents(langType, pageable, recordId);
    }

    @Transactional
    public Integer addContentsScrap(String userId, Long videoId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "scrap_videoId::"+Long.toString(videoId);
        if(setOperations.add(key, userId)==1){ // 스크랩 완료
            return 1;
        }else{ // 이미 좋아요를 눌렀음.
            setOperations.remove(key, userId); // 스크랩 취소
        }
        return 0;
    }
    public Integer addPlayCntToRedis(Long recordId){
        String key = "recordPlayCnt::"+recordId;
        ValueOperations valueOperations = redisTemplate.opsForValue();
        if(valueOperations.get(key)==null){
            Long newCnt = recordRepository.findPlayCount(recordId)+1;
            valueOperations.set(key,Long.toString(newCnt), Duration.ofHours(2));
        }
        else{
            valueOperations.increment(key);
        }
        log.info("add play count to redis : {} ", valueOperations.get(key));
        return 200;
    }

    public ContentsPlayCountRes findPlayCounts(Long recordId, String userId){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        ValueOperations valueOperations = redisTemplate.opsForValue();

        String key = "like_recordId::"+Long.toString(recordId);
        String key2 = "recordPlayCnt::"+recordId;

        boolean isLike = setOperations.isMember(key, userId); // 1: 있음, 0: 없음
        Long likeCount = setOperations.size(key);
        String o = (String) valueOperations.get(key2);
        Long playCount = Long.parseLong(o);
        return new ContentsPlayCountRes(playCount, likeCount, isLike);
    }

}
