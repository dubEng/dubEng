package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DubKingRepository extends JpaRepository<DubKing, Long>, DubKingRepositoryCustom {



}
