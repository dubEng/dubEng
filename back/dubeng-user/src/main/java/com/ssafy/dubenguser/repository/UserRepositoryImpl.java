package com.ssafy.dubenguser.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalendar;
import com.ssafy.dubenguser.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.List;

import static com.ssafy.dubenguser.entity.QCategory.category;
import static com.ssafy.dubenguser.entity.QRecord.record;
import static com.ssafy.dubenguser.entity.QUser.user;
import static com.ssafy.dubenguser.entity.QUserCategory.userCategory;
import static com.ssafy.dubenguser.entity.QUserCalendar.userCalendar;
import static com.ssafy.dubenguser.entity.QVideo.video;

@Slf4j
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    public UserRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<Category> findCategoriesByUserId(String userId) {
        List<Category> categories = jpaQueryFactory
                .select(category)
                .from(user)
                .innerJoin(userCategory).on(user.id.eq(userCategory.user.id))
                .innerJoin(category).on(userCategory.category.id.eq(category.id))
                .where(user.id.eq(userId))
                .fetch();

        return categories;
    }

    @Override
    public List<UserCalendar> findCalendarByUserId(String userId, ZonedDateTime start, ZonedDateTime end) {
        List<UserCalendar> userCalendars = jpaQueryFactory
                .selectFrom(userCalendar)
                .where(userCalendar.user.id.eq(userId).and(userCalendar.calDate.between(start, end)))
                .fetch();

        return userCalendars;
    }

    @Override
    public List<UserRecordRes> findRecordByUserId(String userId, Boolean isPublic, Boolean isLimit, String lanType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(record.user.id.eq(userId));

        if(isPublic) {
            builder.and(record.isPublic.eq(true));
        }

        if(!isLimit){
            builder.and(video.langType.eq(lanType));
        }

        List<UserRecordRes> recordList;
        if(isLimit) {
            recordList = jpaQueryFactory
                    .select(new QUserRecordRes(record.id, video.title, video.thumbnail, record.playCount, record.updatedDate))
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .limit(5)
                    .fetch();
        } else {
            recordList = jpaQueryFactory
                    .select(new QUserRecordRes(record.id, video.title, video.thumbnail, record.playCount, record.updatedDate))
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .fetch();
        }

        return recordList;

    }

    @Override
    public List<RecordLikeRes> findLikedRecordByUserId(String userId, Boolean isLimit, List<Long> recordIds, String lanType) {
        BooleanBuilder builder = new BooleanBuilder();
        List<RecordLikeRes> result;

        builder.and(record.id.in(recordIds));

        if(!isLimit){
            builder.and(video.langType.eq(lanType));
        }

        if(isLimit){
            result = jpaQueryFactory
                    .select(new QRecordLikeRes(record.id, video.title, video.thumbnail, record.user.nickname, record.playCount, record.user.profileImage, record.updatedDate))
                    .from(record)
                    .innerJoin(video).on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .limit(5)
                    .fetch();
        } else {
            result = jpaQueryFactory
                    .select(new QRecordLikeRes(record.id, video.title, video.thumbnail, record.user.nickname, record.playCount, record.user.profileImage, record.updatedDate))
                    .from(record)
                    .innerJoin(video).on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .fetch();
        }

        return result;
    }

    @Override
    public List<VideoBookmarkRes> findBookmarkedVideoByUserId(String userId, Boolean isLimit, List<Long> videoIds, String lanType) {
        BooleanBuilder builder = new BooleanBuilder();
        List<VideoBookmarkRes> result;

        builder.and(video.id.in(videoIds));

        if(!isLimit){
            builder.and(video.langType.eq(lanType));
        }

        if(isLimit) {
            result = jpaQueryFactory
                    .select(new QVideoBookmarkRes(video.id, video.title, video.thumbnail, video.runtime))
                    .from(video)
                    .where(builder)
                    .orderBy(video.updatedDate.desc())
                    .limit(5)
                    .fetch();
        }else {
            result = jpaQueryFactory
                    .select(new QVideoBookmarkRes(video.id, video.title, video.thumbnail, video.runtime))
                    .from(video)
                    .where(builder)
                    .orderBy(video.updatedDate.desc())
                    .fetch();
        }

        return result;
    }
}
