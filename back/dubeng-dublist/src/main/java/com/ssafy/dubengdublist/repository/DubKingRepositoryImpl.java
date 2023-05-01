package com.ssafy.dubengdublist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.QDubKing;

import java.util.List;

import static com.ssafy.dubengdublist.entity.QDubKing.dubKing;

public class DubKingRepositoryImpl implements DubKingRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public DubKingRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public DubKing idDubKingVotedId(String votedId){
        List<DubKing> dubKings = queryFactory
                .select(dubKing)
                .from(dubKing)
                .where(dubKing.user.id.eq(votedId))
                .fetch();
        System.out.println("사이즈 -----" + dubKings.size());
        if(dubKings.size() > 0)
            return dubKings.get(0);
        else
            return null;
    }

}
