package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.Record;
import com.ssafy.dubengdublist.entity.RecordComment;
import com.ssafy.dubengdublist.entity.User;
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


    public CommunityDubKingRes SelectOneDubKing(String langType, String userId) {
        return videoRepository.SelectOneDubKing(langType, userId);
    }

    @Transactional
    public Integer insertDubKing(String userId,String votedId) {

        Optional<User> user = userRepository.findById(userId);
        User user1 = user.get();

        Optional<User> voted = userRepository.findById(votedId);
        User voted1 = voted.get();

        DubKing dubKing = dubKingRepository.idDubKingVotedId(votedId);
        // 이미 존재한거라면
        if(dubKing != null){
            System.out.println("여기에 들어옴");
            dubKing.updateDubKing(dubKing.getTotalVote());
        }else { // 처음 만들어야 한다면
            dubKingRepository.save(new DubKing(voted1, new Long(0), false));
        }
        user1.updateDubKingUser(user1.getIsVoted() + 1);
        return 200;
    }

    public Page<CommunitySearchRes> SelectAllSearch(String langType, String  title, Pageable pageable, List<Long> contentsSearch) {
        return videoRepository.selectAllCommunitySearchRes(langType, title, pageable, contentsSearch);
    }

    public Page<CommunityDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId) {
        return videoRepository.selectAllCommunityDetailRes(langType, pageable, videoId);

    }

    public Page<CommunityCommentRes> SelectAllDetailComment(String langType, Pageable pageable, Long recordId) {
        return videoRepository.selectAllCommunityDetailCommentRes(langType, pageable, recordId);
    }

    public Integer insertDetailComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        User user = ouser.get();
        Optional<Record> orecord = recordRepository.findById(recordId);
        Record record = orecord.get();
        recordCommentRepository.save(new RecordComment(user, record, false, communityDetailCommentReq.getContent()));
        return 200;
    }

    @Transactional
    public Integer updateDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        User user = ouser.get();
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        RecordComment recordComment = orecordComment.get();
        System.out.println(recordComment.getId());
        recordComment.updateComment(communityDetailCommentReq.getContent());
        return 200;
    }

    @Transactional
    public Integer deleteDetailComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq) {
        Optional<User> ouser = userRepository.findById(userId);
        User user = ouser.get();
        Optional<RecordComment> orecordComment = recordCommentRepository.findById(recordCommentId);
        RecordComment recordComment = orecordComment.get();
        System.out.println(recordComment.getId());
        recordComment.deleteComment();
        return 200;

    }
}
