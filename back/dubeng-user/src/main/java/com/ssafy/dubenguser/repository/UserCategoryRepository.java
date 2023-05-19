package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {
}
