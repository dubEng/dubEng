package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.entity.UserMission;
import com.ssafy.dubenguser.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserMissionRepository extends JpaRepository<UserMission, Long> {

    @Query("select new com.ssafy.dubenguser.dto.UserMissionRes(m.video.id, m.title, m.assets, m.color, um.isComplete)" +
            " from UserMission um " +
            "left join Mission m on m.id = um.mission.id" +
            " where um.user=:user")
    public List<UserMissionRes> findUserMissionsByUser(User user);

    @Query("select m.assets" +
            " from UserMission um " +
            "left join Mission m on m.id = um.mission.id" +
            " where um.user=:user and um.isComplete=true")
    public List<String> findAssetsByUser(User user);
    public Optional<UserMission> findByUserAndVideo(User user, Video video);

}
