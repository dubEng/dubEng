package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.Mission;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.entity.UserMission;
import com.ssafy.dubenguser.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission, Long> {

}
