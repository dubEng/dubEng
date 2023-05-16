package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.dto.contents.ContentsPlayCountRes;
import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final VideoRepository videoRepository;
    private final DubKingRepository dubKingRepository;
    private final UserRepository userRepository;
    private final RecordCommentRepository recordCommentRepository;
    private final RecordRepository recordRepository;
    private final RecordLikeRepository recordLikeRepository;
    private final CategoryRepository categoryRepository;
    private final RedisTemplate<String, Object> redisTemplate;


    public Map<String, Object> findDubKing(String langType, String userId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        Map<String, Object> result = new HashMap<>();
        // 하루 3번 투표 여부 확인
        String key = "vote_userId::"+userId;
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Object ovalue = valueOperations.get(key);
        Long cnt;
        if(ovalue==null) cnt = 0L;
        else cnt = Long.parseLong((String) ovalue);
        if(cnt>=3L){
            result.put("message", "하루 3번 투표가 끝났습니다.");
        }else{
            result.put("result", videoRepository.findByOneDubKing(langType, userId));
        }
        return result;
    }


    @Transactional
    public Integer addDubKing(String userId,String votedId) {

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        Optional<User> voted = userRepository.findById(votedId);
        if(!voted.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }

        // 투표 하는 사람.
        String key = "vote_userId::"+userId;
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Object ovalue = valueOperations.get(key);
        if(ovalue==null){
            valueOperations.set(key,Long.toString(1L));
        }
        else{
            valueOperations.increment(key);
        }
        log.info("add vote counts to redis : {} ", valueOperations.get(key));

        // 투표 받는 사람.
        String key2 = "dubKing_userId::"+votedId;
        if(valueOperations.get(key2)==null){
            valueOperations.set(key2,Long.toString(1L));
        }
        else{
            valueOperations.increment(key2);
        }
        log.info("add king counts to redis : {} ", valueOperations.get(key2));

        return 200;
    }


    public Page<CommunitySearchRes> findCommunitySearch(String langType, String  title, Pageable pageable, List<Long> contentsSearch) {
        return videoRepository.findByCategoryCommunity(langType, title, pageable, contentsSearch);
    }

    public Page<CommunityDetailScriptRes> findCommunityDetail(String langType, Pageable pageable, Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 녹음입니다!");
        }
        return videoRepository.findByAllCommunity(langType, pageable, recordId);

    }

//    @Override
//    public Page<CommunityCommentRes> CommunityCommentList(String langType, Pageable pageable, Long recordId) {
//        return null;
//    }

    public Page<CommunityCommentRes> findCommunityComment(Pageable pageable, Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 녹음입니다!");
        }
        return videoRepository.findAllCommunityComment(pageable, recordId);
    }

    public Integer addCommunityComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 녹음입니다!");
        }
        Record record = orecord.get();
        recordCommentRepository.save(new RecordComment(user, record, false, communityDetailCommentReq.getContent()));
        return 200;
    }

    @Transactional
    public Integer modifyCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        if(!orecordComment.isPresent()){
            throw new NotFoundException("존재하지 않는 댓글입니다!");
        }
        RecordComment recordComment = orecordComment.get();
        System.out.println(recordComment.getId());
        recordComment.updateComment(communityDetailCommentReq.getContent());
        return 200;
    }

    @Transactional
    public Integer removeCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        if(!orecordComment.isPresent()){
            throw new NotFoundException("존재하지 않는 댓글입니다!");
        }
        RecordComment recordComment = orecordComment.get();
        System.out.println(recordComment.getId());
        recordComment.deleteComment();
        return 200;

    }

    @Transactional
    public Integer addCommunityLike(String userId, Long recordId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 녹음입니다!");
        }
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "like_userId::"+userId;
        String cntKey = "recordLikeCnt::"+Long.toString(recordId);
        String recordStr = Long.toString(recordId);
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Integer result = 0;
        if(valueOperations.get(cntKey)==null){
            valueOperations.set(cntKey,"0");
        }

        if(setOperations.add(key, recordStr)==1){ // 좋아요 완료
            valueOperations.increment(cntKey);
            String temp = (String) valueOperations.get(cntKey);
            result = Integer.parseInt(temp);
            System.out.println(result);
            return result;
        }else { // 이미 좋아요를 눌렀음.
            setOperations.remove(key, recordStr); // 좋아요 취소
            valueOperations.decrement(cntKey);
            String temp = (String) valueOperations.get(cntKey);
            result = Integer.parseInt(temp);
        }

        return result;
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

        String key = "like_userId::"+userId;
        String key2 = "recordPlayCnt::"+recordId;
        String key3 = "recordLikeCnt::"+recordId;

        boolean isLike = setOperations.isMember(key, Long.toString(recordId)); // 1: 있음, 0: 없음

        String o = (String) valueOperations.get(key2);
        Long playCount = 0L;
        if(o!=null){
            playCount = Long.parseLong(o);
        }

        String o2 = (String) valueOperations.get(key3);
        Long likeCount = 0L;
        if(o2!=null){
            likeCount = Long.parseLong(o2);
        }

        return new ContentsPlayCountRes(playCount, likeCount, isLike);
    }

    public List<CommunityCategoryRes> findCategories(){
        return categoryRepository.findByAll();
    }
}
