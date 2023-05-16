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
    public Page<ContentsDetailScriptRes> findContentsDetails(Pageable pageable, Long videoId) {
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }

        return videoRepository.findByAllContents(ovideo.get().getLangType(), pageable, videoId);
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
        String key = "scrap_userId::"+userId;
        String videoStr = Long.toString(videoId);
        if(setOperations.add(key, videoStr)==1){ // 스크랩 완료
            return 1;
        }else{ // 이미 좋아요를 눌렀음.
            setOperations.remove(key, videoStr); // 스크랩 취소
        }
        return 0;
    }

    public boolean findContentsScrap(String userId, Long videoId){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "scrap_userId::"+userId;
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        boolean isScrap = setOperations.isMember(key, Long.toString(videoId)); // 1: 있음, 0: 없음
        return isScrap;
    }


}
