package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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


    public CommunityDubKingRes SelectOneDubKing(String langType, String userId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }else if(ouser.get().getIsVoted() >= 3){
            throw new NotFoundException("하루 3번 투표가 끝났습니다.");
        }
        return videoRepository.SelectOneDubKing(langType, userId);
    }

    @Transactional
    public Integer insertDubKing(String userId,String votedId) {

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

        DubKing dubKing = dubKingRepository.idDubKingVotedId(votedId);
        // 이미 존재한거라면
        if(dubKing != null){
            dubKing.updateDubKing(dubKing.getTotalVote());
        }else { // 처음 만들어야 한다면
            dubKingRepository.save(new DubKing(voted1, new Long(0), false));
        }
        user1.updateDubKingUser(user1.getIsVoted() + 1);
        return 200;
    }

    public Page<CommunitySearchRes> SelectAllSearch(String langType, String  title, Pageable pageable, List<Long> contentsSearch) {
        for(Long c : contentsSearch){
            Optional<Category> category = categoryRepository.findById(c);
            if(!category.isPresent()){
                throw new NotFoundException("존재하지 않는 카테고리입니다!");
            }
        }
        return videoRepository.selectAllCommunitySearchRes(langType, title, pageable, contentsSearch);
    }

    public Page<CommunityDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId) {
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        return videoRepository.selectAllCommunityDetailRes(langType, pageable, videoId);

    }

    @Override
    public Page<CommunityCommentRes> SelectAllDetailComment(String langType, Pageable pageable, Long recordId) {
        return null;
    }

    public Page<CommunityCommentRes> SelectAllDetailComment(Pageable pageable, Long recordId) {
        Optional<Record> orecord = recordRepository.findById(recordId);
        if(!orecord.isPresent()){
            throw new NotFoundException("존재하지 않는 녹음입니다!");
        }
        return videoRepository.selectAllCommunityDetailCommentRes(pageable, recordId);
    }

    public Integer insertDetailComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq) {
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
    public Integer updateDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
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
    public Integer deleteDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
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
    public Integer selectOneDetailLike(String userId, Long recordId) {
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
        RecordLike recordLike = videoRepository.selectOneRecordLike(recordId, userId);

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
}
