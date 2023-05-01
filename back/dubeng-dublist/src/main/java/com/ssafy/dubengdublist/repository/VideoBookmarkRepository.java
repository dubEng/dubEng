package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.Video;
import com.ssafy.dubengdublist.entity.VideoBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoBookmarkRepository extends JpaRepository<VideoBookmark, Long> {
}
