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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
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


    public CommunityDubKingRes findDubKing(String langType, String userId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }else if(ouser.get().getIsVoted() >= 3){
            throw new NotFoundException("하루 3번 투표가 끝났습니다.");
        }
        return videoRepository.findByOneDubKing(langType, userId);
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
        User user1 = user.get();
        User voted1 = voted.get();

        DubKing dubKing = dubKingRepository.findByVotedId(votedId);
        // 이미 존재한거라면
        if(dubKing != null){
            dubKing.updateDubKing(dubKing.getTotalVote());
        }else { // 처음 만들어야 한다면
            dubKingRepository.save(new DubKing(voted1, new Long(0), false));
        }
        user1.updateDubKingUser(user1.getIsVoted() + 1);
        return 200;
    }

    public Page<CommunitySearchRes> findCommunitySearch(String langType, String  title, Pageable pageable, List<Long> contentsSearch) {
        return videoRepository.findByCategoryCommunity(langType, title, pageable, contentsSearch);
    }

    public Page<CommunityDetailScriptRes> findCommunityDetail(String langType, Pageable pageable, Long recordId) {
        Optional<Video> ovideo = videoRepository.findById(recordId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
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
        Record record = orecord.get();
        // userid와 recordid로 해서 찾은 recordlike 값
        RecordLike recordLike = videoRepository.findByRecordLike(recordId, userId);

        // 만약 아예 없다면
        if (recordLike == null){
            recordLikeRepository.save(new RecordLike(user, record, true));
            record.updateLikeCount(true, record.getLikeCount());
        }else {
            recordLike.updateRecordLike(recordLike.getIsActive());
            record.updateLikeCount(recordLike.getIsActive(), record.getLikeCount());
        }

        return 200;
    }

    public void setLikeToRedis(String userId, Long recordId){
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
        String key = "like_recordId::"+Long.toString(recordId);
        setOperations.add(key, userId); // 좋아요 완료

        log.info("like set : {}", recordId);
    }
}
