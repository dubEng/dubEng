package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.RecordComment;
import com.ssafy.dubengdublist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordCommentRepository extends JpaRepository<RecordComment, Long> {
}
