package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
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
        Video video = ovideo.get();
        // userid와 recordid로 해서 찾은 recordlike 값
        VideoBookmark videoBookmark = videoRepository.findByVideoBookmark(videoId, userId);
        // 만약 아예 없다면
        if (videoBookmark == null){
            videoBookmarkRepository.save(new VideoBookmark(user, video, true));
        }else {
            videoBookmark.updateVideoBookmark(videoBookmark.getIsActive());
        }

        return 200;
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

}
