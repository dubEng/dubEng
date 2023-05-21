package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
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
    private final UserRepository userRepository;
    private final RecordCommentRepository recordCommentRepository;
    private final RecordRepository recordRepository;
    private final CategoryRepository categoryRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final String MESSAGE1 = "존재하지 않는 유저입니다!";
    private final String MESSAGE2 = "존재하지 않는 녹음입니다!";



    public Map<String, Object> findDubKing(String langType, String userId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()) {
            throw new NotFoundException(MESSAGE1);
        }
        Map<String, Object> result = new HashMap<>();

        String key = "vote_userId::"+userId;
        ValueOperations valueOperations = redisTemplate.opsForValue();
        Object ovalue = valueOperations.get(key);
        Long cnt;
        if(ovalue==null) cnt = 1L;
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
            throw new NotFoundException(MESSAGE1);
        }
        Optional<User> voted = userRepository.findById(votedId);
        if(!voted.isPresent()){
            throw new NotFoundException(MESSAGE1);
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

    public CommunityDetailScriptRes findCommunityDetail(Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException(MESSAGE2);
        }
        // 언어 알기
        String langType = orecord.get().getVideo().getLangType();
        return videoRepository.findByAllCommunity(langType, recordId);
    }

    public Page<CommunityDetailScriptRes> findCommunityShorts(Pageable pageable) {
        return videoRepository.findByAllShortsCommunity(pageable);
    }

    public Page<CommunityCommentRes> findCommunityComment(Pageable pageable, Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException(MESSAGE2);
        }
        return videoRepository.findAllCommunityComment(pageable, recordId);
    }

    public Integer addCommunityComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException(MESSAGE1);
        }
        User user = ouser.get();

        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException(MESSAGE1);
        }
        Record record1 = orecord.get();
        recordCommentRepository.save(new RecordComment(user, record1, false, communityDetailCommentReq.getContent()));
        return 200;
    }

    @Transactional
    public Integer modifyCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException(MESSAGE1);
        }
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        if(!orecordComment.isPresent()){
            throw new NotFoundException("존재하지 않는 댓글입니다!");
        }
        RecordComment recordComment = orecordComment.get();
        recordComment.updateComment(communityDetailCommentReq.getContent());
        return 200;
    }

    @Transactional
    public Integer removeCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException(MESSAGE1);
        }
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        if(!orecordComment.isPresent()){
            throw new NotFoundException("존재하지 않는 댓글입니다!");
        }
        RecordComment recordComment = orecordComment.get();
        recordComment.deleteComment();
        return 200;

    }

    @Transactional
    public Integer addCommunityLike(String userId, Long recordId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException(MESSAGE1);
        }
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException(MESSAGE2);
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
    public Long addPlayCntToRedis(Long recordId){
        String playCntKey = "recordPlayCnt::"+recordId;
        ValueOperations valueOperations = redisTemplate.opsForValue();

        if(valueOperations.get(playCntKey)==null){
            Long newCnt = recordRepository.findPlayCount(recordId)+1;
            valueOperations.set(playCntKey,Long.toString(newCnt), Duration.ofHours(2));
        }
        else{
            valueOperations.increment(playCntKey);
        }
        String o = (String) valueOperations.get(playCntKey);
        Long playCount = 0L;
        if(o!=null){
            playCount = Long.parseLong(o);
        }
        return playCount;
    }

    public CommunityLikeRes findLikeInfo(Long recordId, String userId){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        ValueOperations valueOperations = redisTemplate.opsForValue();
        String likeUserKey = "like_userId::"+userId;
        String likeCntKey = "recordLikeCnt::"+recordId;
        boolean isLike = setOperations.isMember(likeUserKey, Long.toString(recordId)); // 1: 있음, 0: 없음
        String o2 = (String) valueOperations.get(likeCntKey);
        Long likeCount = 0L;
        if(o2!=null){
            likeCount = Long.parseLong(o2);
        }
        return new CommunityLikeRes(likeCount, isLike);
    }

    public Map<String, Object> findPlayCounts(Long recordId, String userId){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        ValueOperations valueOperations = redisTemplate.opsForValue();
        HashMap<String, Object> result = new HashMap<>();

        String key = "like_userId::"+userId;
        String key2 = "recordPlayCnt::"+recordId;
        String key3 = "recordLikeCnt::"+recordId;

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

        result.put("playCount", playCount);
        result.put("likeCount", likeCount);
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            return result;
        }
        boolean isLike = setOperations.isMember(key, Long.toString(recordId)); // 1: 있음, 0: 없음
        result.put("isLike", isLike);
        return result;
    }

    public List<CommunityCategoryRes> findCategories(){
        return categoryRepository.findByAll();
    }
}
