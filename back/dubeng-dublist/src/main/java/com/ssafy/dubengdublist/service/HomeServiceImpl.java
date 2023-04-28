package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.home.HomeDubKing;
import com.ssafy.dubengdublist.dto.home.HomePopularity;
import com.ssafy.dubengdublist.dto.home.HomeRank;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final VideoRepository videoRepository;

    public List<HomePopularity> selectAllHomePopularity(){
        List<HomePopularity> homePopularity = videoRepository.selectAllHomePopularity();
        return homePopularity;
    }

    public List<HomeRank> selectAllHomeRank(){
        List<HomeRank> homeRanks = videoRepository.selectAllHomeRank();
        return homeRanks;
    }

    public List<HomeDubKing> selectAllHomeDubKing(){
        List<HomeDubKing> homeDubKings = videoRepository.selectAllHomeDubKing();
        return homeDubKings;
    }

}
