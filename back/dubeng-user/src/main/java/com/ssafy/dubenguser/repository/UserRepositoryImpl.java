package com.ssafy.dubenguser.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubenguser.dto.UserCalenderRes;
import com.ssafy.dubenguser.dto.UserCategoryRes;
import com.ssafy.dubenguser.dto.UserLikedRecordRes;
import com.ssafy.dubenguser.dto.UserRecordRes;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalender;
import com.ssafy.dubenguser.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.dubenguser.entity.QCategory.category;
import static com.ssafy.dubenguser.entity.QRecord.record;
import static com.ssafy.dubenguser.entity.QRecordLike.recordLike;
import static com.ssafy.dubenguser.entity.QUser.user;
import static com.ssafy.dubenguser.entity.QUserCategory.userCategory;
import static com.ssafy.dubenguser.entity.QUserCalender.userCalender;
import static com.ssafy.dubenguser.entity.QVideo.video;

@Slf4j
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    public UserRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<UserCategoryRes> findCategoriesByUserId(Long userId) {
        List<Category> categories = jpaQueryFactory
                .select(category)
                .from(user)
                .innerJoin(userCategory).on(user.id.eq(userCategory.user.id))
                .innerJoin(category).on(userCategory.category.id.eq(category.id))
                .where(user.id.eq(userId))
                .fetch();

        if(categories.isEmpty())
            throw new NotFoundException("선택한 카테고리가 없습니다!");

        List<UserCategoryRes> categoryList = new ArrayList<>();

        for(Category c: categories) {
            UserCategoryRes res = new UserCategoryRes();
            res.setCategoryName(c.getName());
            categoryList.add(res);
        }

        return categoryList;
    }

    @Override
    public UserCalenderRes findCalenderByUserId(Long userId, ZonedDateTime start, ZonedDateTime end) {
        List<UserCalender> userCalendars = jpaQueryFactory
                .selectFrom(userCalender)
                .where(userCalender.user.id.eq(userId).and(userCalender.calDate.between(start, end)))
                .fetch();

        if(userCalendars.isEmpty())
            throw new NotFoundException("출석일이 없습니다!");

        List<ZonedDateTime> result = new ArrayList<>();

        for(UserCalender uc: userCalendars) {
            result.add(uc.getCalDate());
        }

        UserCalenderRes res = new UserCalenderRes();
        res.setDates(result);

        return res;
    }

    @Override
    public List<UserRecordRes> findRecordByUserId(Long userId, Boolean isPublic, Boolean isLimit, String lanType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(record.user.id.eq(userId));

        if(isPublic) {
            builder.and(record.isPublic.eq(true));
        }

        if(!isLimit){
            builder.and(video.langType.eq(lanType));
        }

        List<Tuple> recordList = new ArrayList<>();
        if(isLimit) {
            recordList = jpaQueryFactory
                    .select(video.title, video.thumbnail, record.playCount, record.updatedDate)
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .limit(5)
                    .fetch();
        } else {
            recordList = jpaQueryFactory
                    .select(video.title, video.thumbnail, record.playCount, record.updatedDate)
                    .from(record)
                    .innerJoin(video)
                    .on(record.video.id.eq(video.id))
                    .where(builder)
                    .orderBy(record.updatedDate.desc())
                    .fetch();
        }

        if(recordList.isEmpty())
            throw new NotFoundException("아직 더빙한 내역이 없습니다!");

        List<UserRecordRes> result = new ArrayList<>();
        for(Tuple rt: recordList) {
            UserRecordRes res = UserRecordRes.builder()
                    .title(rt.get(video.title))
                    .thumbnail(rt.get(video.thumbnail))
                    .playCount(rt.get(record.playCount))
                    .updatedDate(rt.get(record.updatedDate))
                    .build();
            result.add(res);
        }

        return result;

    }

    @Override
    public List<UserLikedRecordRes> findLikedRecordByUserId(Long userId) {
        List<Tuple> likedRecordList = jpaQueryFactory
                .select(video.title, video.thumbnail, user.nickname, record.playCount, recordLike.updatedDate)
                .from(recordLike)
                .innerJoin(record).on(recordLike.record.id.eq(record.id))
                .innerJoin(video).on(record.video.id.eq(video.id))
                .innerJoin(user).on(recordLike.user.id.eq(userId))
                .orderBy(record.updatedDate.desc())
                .fetch();

        List<UserLikedRecordRes> result = new ArrayList<>();
        return result;
    }
}
