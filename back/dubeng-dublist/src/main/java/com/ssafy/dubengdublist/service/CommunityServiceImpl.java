package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.CommunityDetailScriptRes;
import com.ssafy.dubengdublist.dto.community.CommunityDubKingRes;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.User;
import com.ssafy.dubengdublist.repository.DubKingRepository;
import com.ssafy.dubengdublist.repository.UserRepository;
import com.ssafy.dubengdublist.repository.VideoRepository;
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
            dubKingRepository.save(new DubKing(voted1, new Long(1), false));
        }
        user1.updateDubKingUser(user1.getIsVoted() + 1);
        return 200;
    }

    public Page<CommunitySearchRes> SelectAllSearch(String langType, Pageable pageable, List<Long> contentsSearch) {
        return videoRepository.selectAllCommunitySearchRes(langType, pageable, contentsSearch);
    }

    public Page<CommunityDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId) {
        return videoRepository.selectAllCommunityDetailRes(langType, pageable, videoId);

    }
}
