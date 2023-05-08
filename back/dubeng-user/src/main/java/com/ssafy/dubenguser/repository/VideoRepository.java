package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
