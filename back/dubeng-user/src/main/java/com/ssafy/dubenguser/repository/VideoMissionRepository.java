package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.entity.Mission;
import com.ssafy.dubenguser.entity.Video;
import com.ssafy.dubenguser.entity.VideoMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VideoMissionRepository extends JpaRepository<VideoMission, Long> {

    @Query("select vm.mission" +
            " from VideoMission vm " +
            " where vm.video=:video")
    public Optional<Mission> findVideoMissionByVideo(Video video);
}
