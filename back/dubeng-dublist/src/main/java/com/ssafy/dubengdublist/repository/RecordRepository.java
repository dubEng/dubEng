package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.Record;
import com.ssafy.dubengdublist.entity.RecordComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecordRepository extends JpaRepository<Record, Long>, RecordRepositoryCustom {
}
