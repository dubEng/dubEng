package com.ssafy.dubenguser.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalender;
import com.ssafy.dubenguser.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.List;

import static com.ssafy.dubenguser.entity.QCategory.category;
import static com.ssafy.dubenguser.entity.QRecord.record;
import static com.ssafy.dubenguser.entity.QRecordLike.recordLike;
import static com.ssafy.dubenguser.entity.QUser.user;
import static com.ssafy.dubenguser.entity.QUserCategory.userCategory;
import static com.ssafy.dubenguser.entity.QUserCalender.userCalender;
import static com.ssafy.dubenguser.entity.QVideo.video;
import static com.ssafy.dubenguser.entity.QVideoBookmark.videoBookmark;

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

        if(categories.isEmpty())
            throw new NotFoundException("선택한 카테고리가 없습니다!");

        return categories;
    }

    @Override
    public List<UserCalender> findCalenderByUserId(String userId, ZonedDateTime start, ZonedDateTime end) {
        List<UserCalender> userCalendars = jpaQueryFactory
                .selectFrom(userCalender)
                .where(userCalender.user.id.eq(userId).and(userCalender.calDate.between(start, end)))
                .fetch();

        if(userCalendars.isEmpty())
            throw new NotFoundException("출석일이 없습니다!");

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
                    .select(new QUserRecordRes(video.title, video.thumbnail, record.playCount, record.updatedDate))
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .limit(5)
                    .fetch();
        } else {
            recordList = jpaQueryFactory
                    .select(new QUserRecordRes(video.title, video.thumbnail, record.playCount, record.updatedDate))
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .fetch();
        }

        if(recordList.isEmpty())
            throw new NotFoundException("아직 더빙한 내역이 없습니다!");

        return recordList;

    }

    @Override
    public List<RecordLikeRes> findLikedRecordByUserId(String userId, Boolean isLimit, List<Long> recordIds) {

        List<RecordLikeRes> result;

        if(isLimit){
            result = jpaQueryFactory
                    .select(new QRecordLikeRes(video.title, video.thumbnail, record.user.nickname, record.playCount))
                    .from(record)
                    .innerJoin(video).on(record.video.id.eq(video.id))
                    .where(record.id.in(recordIds))
                    .orderBy(record.updatedDate.desc())
                    .limit(5)
                    .fetch();
        } else {
            result = jpaQueryFactory
                    .select(new QRecordLikeRes(video.title, video.thumbnail, record.user.nickname, record.playCount))
                    .from(record)
                    .innerJoin(video).on(record.video.id.eq(video.id))
                    .where(record.id.in(recordIds))
                    .orderBy(record.updatedDate.desc())
                    .fetch();
        }

        return result;
    }

    @Override
    public List<VideoBookmarkRes> findBookmarkedVideoByUserId(String userId, Boolean isLimit, List<Long> videoIds) {

        List<VideoBookmarkRes> result;
        if(isLimit) {
            result = jpaQueryFactory
                    .select(new QVideoBookmarkRes(video.title, video.thumbnail))
                    .from(video)
                    .where(video.id.in(videoIds))
                    .orderBy(video.updatedDate.desc())
                    .limit(5)
                    .fetch();
        }else {
            result = jpaQueryFactory
                    .select(new QVideoBookmarkRes(video.title, video.thumbnail))
                    .from(video)
                    .where(video.id.in(videoIds))
                    .orderBy(video.updatedDate.desc())
                    .fetch();
        }
        return result;
    }
}
