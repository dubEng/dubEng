package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.entity.Category;
import com.ssafy.dubengdublist.entity.DubKing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
