package com.ssafy.dubengdublist.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.dto.community.*;
import com.ssafy.dubengdublist.dto.contents.*;
import com.ssafy.dubengdublist.entity.QRecord;
import com.ssafy.dubengdublist.entity.QUser;
import com.ssafy.dubengdublist.entity.Script;
import com.ssafy.dubengdublist.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.dubengdublist.entity.QScript.script;
import static com.ssafy.dubengdublist.entity.QUser.user;
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

    public Page<CommunitySearchRes> selectAllCommunitySearchRes(String langType, Pageable pageable, List<Long> contentsSearch){
        BooleanBuilder builder = new BooleanBuilder();

        for(Long s : contentsSearch){
            builder.or(videoCategory.category.id.eq(s));
        }
        if (!StringUtils.isEmpty(langType)) {
            builder.and(video.langType.eq(langType));
        }

        List<CommunitySearchRes> content = queryFactory
                .select(new QCommunitySearchRes(video.id, video.title,video.thumbnail,video.runtime, user.nickname, QRecord.record.playCount, QRecord.record.createdDate))
                .from(video)
                .where(builder)
                .leftJoin(videoCategory)
                .on(videoCategory.video.id.eq(video.id))
                .leftJoin(QRecord.record)
                .on(video.id.eq(QRecord.record.video.id))
                .leftJoin(user)
                .on(user.id.eq(QRecord.record.user.id))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Video> countQuery = queryFactory
                .select(video)
                .from(video);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    public Page<ContentsDetailScriptRes> selectAllContentsDetailRes(String langType, Pageable pageable, Long videoId){

        // 맨 처음은 해당 영상 + 뒤에는 랜덤 영상(추천)
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

        List<ContentsDetailScriptRes> contentsDetailScriptResList = new ArrayList<>();
        for(ContentsDetailRes c : content){
            ContentsDetailScriptRes cd = new ContentsDetailScriptRes(c.getId(), c.getTitle(), c.getThumbnail(), c.getVideoPath(), selectAllScript(c.getId()));
            contentsDetailScriptResList.add(cd);
        }

        JPAQuery<Video> countQuery = queryFactory
                .select(video)
                .from(video);

        return PageableExecutionUtils.getPage(contentsDetailScriptResList, pageable, countQuery::fetchCount);
    }

    public List<ContentsScriptRes> selectAllScript(Long videoId){
        List<ContentsScriptRes> scriptList = queryFactory
                .select(new QContentsScriptRes(script.startTime, script.duration, script.content, script.translateContent))
                .from(script)
                .where(script.video.id.eq(videoId))
                .fetch();
        return scriptList;
    }


    public CommunityDubKingRes SelectOneDubKing(String langType, String userId){

        ContentsDetailRes content = queryFactory
                .select(new QContentsDetailRes(video.id, video.title, video.thumbnail, video.videoPath))
                .from(video)
                .join(QRecord.record)
                .on(QRecord.record.video.id.eq(video.id))
                .where(video.langType.eq(langType), QRecord.record.isPublic.eq(true), QRecord.record.user.id.ne(userId))
                .groupBy(video.id)
                .having(video.id.count().goe(2))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .fetchFirst();

        List<CommunityDubKingUserRes> users = queryFactory
                .select(new QCommunityDubKingUserRes(user.id, user.nickname, user.profileImage, user.description, QRecord.record.recordPath))
                .from(QRecord.record)
                .join(user)
                .on(QRecord.record.user.id.eq(user.id))
                .where(QRecord.record.video.id.eq(content.getId()), QRecord.record.isPublic.eq(true), user.id.ne(userId))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(2)
                .fetch();
        CommunityDubKingUserRes users1 = new CommunityDubKingUserRes(users.get(0).getId(), users.get(0).getNickname(), users.get(0).getProfileImage(), users.get(0).getDescription(), users.get(0).getRecordPath());
        CommunityDubKingUserRes users2 = new CommunityDubKingUserRes(users.get(1).getId(), users.get(1).getNickname(), users.get(1).getProfileImage(), users.get(1).getDescription(), users.get(1).getRecordPath());
        CommunityDubKingRes communityDubKingRes = new CommunityDubKingRes(content.getId(), content.getTitle(), content.getThumbnail(), content.getVideoPath(), users1, users2);

        return communityDubKingRes;
    }



}
