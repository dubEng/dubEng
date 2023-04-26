package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.dto.contents.ContentsSearchRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VideoRepositoryCustom {

    public Page<ContentsSearchRes> selectAllContentsSearchRes(String langType, Pageable pageable, List<Long> contentsSearch);
}
