package com.ssafy.dubengdublist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.entity.DubKing;
import com.ssafy.dubengdublist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
