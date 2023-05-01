package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailScriptRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import com.ssafy.dubengdublist.entity.*;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.CategoryRepository;
import com.ssafy.dubengdublist.repository.UserRepository;
import com.ssafy.dubengdublist.repository.VideoBookmarkRepository;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentsServiceImpl implements ContentsService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;
    private final VideoBookmarkRepository videoBookmarkRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public HashMap<String, Object> SelectAllRecommend(String langType, Pageable pageable){
        Slice<ContentsRecommendRes> contentsRecommendSlice = videoRepository.findAllByLangType(langType, pageable);
        List<ContentsRecommendRes> ContentsRecommendList = contentsRecommendSlice.getContent().stream()
                .collect(Collectors.toList());
        HashMap<String, Object> result = new HashMap<>();
        result.put("ContentsRecommendList", ContentsRecommendList);
        result.put("hasNextPage", contentsRecommendSlice.hasNext());
        return result;
    }

    @Transactional
    public Page<ContentsSearchRes> SelectAllSearch(String langType, String title, Pageable pageable, List<Long> contentsSearch) {
        for(Long c : contentsSearch){
            Optional<Category> category = categoryRepository.findById(c);
            if(!category.isPresent()){
                throw new NotFoundException("존재하지 않는 카테고리입니다!");
            }
        }
        return videoRepository.selectAllContentsSearchRes(langType, title, pageable, contentsSearch);
    }

    @Transactional
    public Page<ContentsDetailScriptRes> SelectAllDetail(String langType, Pageable pageable, Long videoId) {
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        return videoRepository.selectAllContentsDetailRes(langType, pageable, videoId);
    }

    @Transactional
    public Integer selectOneDetailScrap(String userId, Long videoId) {
        Optional<User> ouser = userRepository.findById(userId);
        if(!ouser.isPresent()){
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }
        User user = ouser.get();
        Optional<Video> ovideo = videoRepository.findById(videoId);
        if(!ovideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        Video video = ovideo.get();
        // userid와 recordid로 해서 찾은 recordlike 값
        VideoBookmark videoBookmark = videoRepository.selectOneVideoBookmark(videoId, userId);
        // 만약 아예 없다면
        if (videoBookmark == null){
            videoBookmarkRepository.save(new VideoBookmark(user, video, true));
        }else {
            videoBookmark.updateVideoBookmark(videoBookmark.getIsActive());
        }

        return 200;
    }
}
