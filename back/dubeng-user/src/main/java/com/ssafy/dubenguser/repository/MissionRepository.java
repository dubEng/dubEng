package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {
}
