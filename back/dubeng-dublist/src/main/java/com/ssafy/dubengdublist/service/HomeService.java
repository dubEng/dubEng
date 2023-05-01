package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.home.HomeDubKingRes;
import com.ssafy.dubengdublist.dto.home.HomePopularityRes;
import com.ssafy.dubengdublist.dto.home.HomeRankRes;

import java.util.List;

public interface HomeService {

    List<HomePopularityRes> findHomePopularity();
    List<HomeRankRes> findHomeRank();
    List<HomeDubKingRes> findHomeDubKing();
}
