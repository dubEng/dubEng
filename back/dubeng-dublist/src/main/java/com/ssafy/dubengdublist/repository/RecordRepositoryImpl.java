package com.ssafy.dubengdublist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.dubengdublist.entity.QRecord.record;

public class RecordRepositoryImpl implements RecordRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public RecordRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Transactional
    public void updatePlayCount(Long recordId, Long cnt){
        queryFactory
                .update(record)
                .set(record.playCount, cnt)
                .where(record.id.eq(recordId))
                .execute();
    }

    @Override
    public Long findPlayCount(Long recordId) {
        return queryFactory
                .select(record.playCount)
                .from(record)
                .where(record.id.eq(recordId))
                .fetchFirst();
    }

}
