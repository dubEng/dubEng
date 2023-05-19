package com.ssafy.dubengdublist.repository;

import com.ssafy.dubengdublist.dto.community.CommunityCategoryRes;
import com.ssafy.dubengdublist.entity.Category;
import com.ssafy.dubengdublist.entity.DubKing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select new com.ssafy.dubengdublist.dto.community.CommunityCategoryRes(c.id, c.name) from Category c")
    public List<CommunityCategoryRes> findByAll();
}
