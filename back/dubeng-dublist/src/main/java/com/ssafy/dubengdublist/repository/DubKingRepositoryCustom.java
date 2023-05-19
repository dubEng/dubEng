package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.DubKing;

public interface DubKingRepositoryCustom {

    public DubKing findByVotedId(String votedId);
}
