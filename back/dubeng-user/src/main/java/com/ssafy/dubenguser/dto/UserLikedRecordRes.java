package com.ssafy.dubenguser.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
@Data
@NoArgsConstructor
<<<<<<< HEAD:back/dubeng-user/src/main/java/com/ssafy/dubenguser/dto/RecordLikeRes.java
public class RecordLikeRes {
    private Long id;
=======
public class UserLikedRecordRes {
>>>>>>> develop-front:back/dubeng-user/src/main/java/com/ssafy/dubenguser/dto/UserLikedRecordRes.java
    private String title;
    private String thumbnail;
    private String nickname;
    private Long playCount;
//    private ZonedDateTime updatedDate;

    @Builder
    @QueryProjection
<<<<<<< HEAD:back/dubeng-user/src/main/java/com/ssafy/dubenguser/dto/RecordLikeRes.java
    public RecordLikeRes(Long id, String title, String thumbnail, String nickname, Long playCount) {
        this.id = id;
=======
    public UserLikedRecordRes(String title, String thumbnail, String nickname, Long playCount, ZonedDateTime updatedDate) {
>>>>>>> develop-front:back/dubeng-user/src/main/java/com/ssafy/dubenguser/dto/UserLikedRecordRes.java
        this.title = title;
        this.thumbnail = thumbnail;
        this.nickname = nickname;
        this.playCount = playCount;
//        this.updatedDate = updatedDate;
    }
}
