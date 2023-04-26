package com.ssafy.dubengdublist.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.dto.contents.QContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.QContentsSearchRes;
import com.ssafy.dubengdublist.entity.Script;
import com.ssafy.dubengdublist.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.dubengdublist.entity.QScript.script;
import static com.ssafy.dubengdublist.entity.QVideo.video;
import static com.ssafy.dubengdublist.entity.QVideoCategory.videoCategory;

public class VideoRepositoryImpl implements VideoRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public VideoRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public Page<ContentsSearchRes> selectAllContentsSearchRes(String langType, Pageable pageable,List<Long> contentsSearch){

        BooleanBuilder builder = new BooleanBuilder();

        for(Long s : contentsSearch){
            builder.or(videoCategory.category.id.eq(s));
        }
        if (!StringUtils.isEmpty(langType)) {
            builder.and(video.langType.eq(langType));
        }

        List<ContentsSearchRes> content = queryFactory
                .select(new QContentsSearchRes(video.id, video.title, video.thumbnail, video.runtime))
                .from(video)
                .where(builder)
                .leftJoin(videoCategory)
                .on(videoCategory.video.id.eq(video.id))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Video> countQuery = queryFactory
                .select(video)
                .from(video);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    public Page<ContentsDetailRes> selectAllContentsDetailRes(String langType, Pageable pageable, Long videoId){

        // 맨 처음은 해당 영상 + 뒤에는 랜덤 영상(추천)
//
//        List<Script> scriptList = queryFactory
//                .select(script)
//                .from(script)
//                .where(script.video.id.eq(videoId))
//                .fetch();

        NumberExpression<Integer> roleRankPath = new CaseBuilder()
                .when(video.id.eq(videoId)).then(1)
                .otherwise(2);

        List<ContentsDetailRes> content = queryFactory
                .select(new QContentsDetailRes(video.id, video.title, video.thumbnail, video.videoPath))
                .from(video)
                .where(video.langType.eq(langType))
                .orderBy(roleRankPath.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Video> countQuery = queryFactory
                .select(video)
                .from(video);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

}
