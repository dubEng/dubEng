package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.home.HomeDubKing;
import com.ssafy.dubengdublist.dto.home.HomePopularity;
import com.ssafy.dubengdublist.dto.home.HomeRank;

import java.util.List;

public interface HomeService {

    List<HomePopularity> selectAllHomePopularity();
    List<HomeRank> selectAllHomeRank();
    List<HomeDubKing> selectAllHomeDubKing();
}
