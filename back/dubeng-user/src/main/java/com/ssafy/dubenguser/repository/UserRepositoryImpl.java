package com.ssafy.dubenguser.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubenguser.dto.UserCategoryRes;
import com.ssafy.dubenguser.entity.Category;
import lombok.extern.slf4j.Slf4j;
import org.yaml.snakeyaml.tokens.ScalarToken;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.dubenguser.entity.QCategory.category;
import static com.ssafy.dubenguser.entity.QUser.user;
import static com.ssafy.dubenguser.entity.QUserCategory.userCategory;

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
}
