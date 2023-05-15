package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.UserCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCalenderRepository extends JpaRepository<UserCalendar, Long> {
    @Query("select uc from UserCalendar uc WHERE uc.user.id =:userId and uc.month =:month")
    public List<UserCalendar> findByUserIdAndMonth(String userId, int month);
}
