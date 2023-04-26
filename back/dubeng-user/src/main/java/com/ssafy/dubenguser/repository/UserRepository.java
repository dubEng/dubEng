package com.ssafy.dubenguser.repository;


import com.ssafy.dubenguser.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
