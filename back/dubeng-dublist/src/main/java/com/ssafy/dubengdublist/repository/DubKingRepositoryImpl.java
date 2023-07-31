package com.ssafy.dubengdublist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.QDubKing;
import com.ssafy.dubengdublist.exception.NotFoundException;

import java.util.List;

import static com.ssafy.dubengdublist.entity.QDubKing.dubKing;

public class DubKingRepositoryImpl implements DubKingRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public DubKingRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    // dubking에 투표자자 찾기
    public DubKing findByVotedId(String votedId){
        List<DubKing> dubKings = queryFactory
                .select(dubKing)
                .from(dubKing)
                .where(dubKing.user.id.eq(votedId))
                .fetch();

        if(dubKings.isEmpty())
            throw new NotFoundException("아이디가 없습니다!");

        if(dubKings.isEmpty())
            return dubKings.get(0);
        else
            return null;
    }

}
