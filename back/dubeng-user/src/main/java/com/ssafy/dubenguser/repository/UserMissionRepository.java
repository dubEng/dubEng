package com.ssafy.dubenguser.repository;

import com.ssafy.dubenguser.dto.UserMissionRes;
import com.ssafy.dubenguser.entity.Mission;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.entity.UserMission;
import com.ssafy.dubenguser.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserMissionRepository extends JpaRepository<UserMission, Long> {

    @Query("select distinct um.mission.id" +
            " from UserMission um " +
            " where um.user=:user")
    public List<Long> findUserMissionsByUser(User user);

    @Query("select m.assets" +
            " from UserMission um " +
            "left join Mission m on m.id = um.mission.id" +
            " where um.user=:user")
    public List<String> findAssetsByUser(User user);

//    @Query("select um from UserMission um where um.user=:user and um.mission.video=:video")
//    public Optional<UserMission> findByUserAndVideo(User user, Video video);
    @Query("select um" +
            " from UserMission um" +
            " where um.user=:user and um.mission=:mission")
    public Optional<UserMission> findByUserAndVideo(User user, Mission mission);

}
