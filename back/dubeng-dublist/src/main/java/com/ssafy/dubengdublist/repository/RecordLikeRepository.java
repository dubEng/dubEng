package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.Record;
import com.ssafy.dubengdublist.entity.RecordLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordLikeRepository extends JpaRepository<RecordLike, Long> {
}
