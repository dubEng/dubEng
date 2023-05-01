package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.home.HomeDubKingRes;
import com.ssafy.dubengdublist.dto.home.HomePopularityRes;
import com.ssafy.dubengdublist.dto.home.HomeRankRes;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final VideoRepository videoRepository;

    public List<HomePopularityRes> findHomePopularity(){
        List<HomePopularityRes> homePopularityRes = videoRepository.findAllHomePopularity();
//        if(homePopularity.size() == 0){
//            throw new NotFoundException("데이터가 없습니다.");
//        }
        return homePopularityRes;
    }

    public List<HomeRankRes> findHomeRank(){
        List<HomeRankRes> homeRankRes = videoRepository.findAllHomeRank();
        return homeRankRes;
    }

    public List<HomeDubKingRes> findHomeDubKing(){
        List<HomeDubKingRes> homeDubKingRes = videoRepository.findHomeDubKing();
        return homeDubKingRes;
    }

}
