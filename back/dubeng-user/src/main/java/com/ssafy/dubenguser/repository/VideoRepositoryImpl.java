package com.ssafy.dubenguser.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

public class VideoRepositoryImpl implements VideoRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    public VideoRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

}
