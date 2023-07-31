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
        return videoRepository.findAllHomePopularity();
    }

    public List<HomeRankRes> findHomeRank(){
        return videoRepository.findAllHomeRank();
    }

    public List<HomeDubKingRes> findHomeDubKing(){
        return videoRepository.findHomeDubKing();
    }

}
