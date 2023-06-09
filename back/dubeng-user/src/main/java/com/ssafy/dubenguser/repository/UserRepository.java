package com.ssafy.dubenguser.repository;


import com.ssafy.dubenguser.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>, UserRepositoryCustom {
    Optional<User> findByNickname(String nickname);
}
