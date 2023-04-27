package com.ssafy.dubenguser.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubenguser.dto.UserCalenderRes;
import com.ssafy.dubenguser.dto.UserCategoryRes;
import com.ssafy.dubenguser.entity.Category;
import com.ssafy.dubenguser.entity.UserCalender;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.dubenguser.entity.QCategory.category;
import static com.ssafy.dubenguser.entity.QUser.user;
import static com.ssafy.dubenguser.entity.QUserCategory.userCategory;
import static com.ssafy.dubenguser.entity.QUserCalender.userCalender;

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
                .where(userCalender.user.id.eq(userId)
                        .and(userCalender.calDate.between(start, end)))
                .fetch();

        List<ZonedDateTime> result = new ArrayList<>();

        for(UserCalender uc: userCalendars) {
            result.add(uc.getCalDate());
        }

        UserCalenderRes res = new UserCalenderRes();
        res.setDates(result);

        return res;
    }
}
