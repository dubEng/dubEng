package com.ssafy.dubenguser.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User extends Time{

    @Id
    private Long id;
    private String email;
    private String nickname;
    private String isActive;
    private String profileImage;
    private String isPublic;
    private String roleType;
    private String description;
    private String landName;
    private Long recordCount;
    private Boolean isVoted;
    private Long totalRecTime;

    @Builder
    public User(Long id, String email, String nickname, String isActive, String profileImage, String isPublic, String roleType, String description, String landName, Long recordCount, Boolean isVoted, Long totalRecTime) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.isActive = isActive;
        this.profileImage = profileImage;
        this.isPublic = isPublic;
        this.roleType = roleType;
        this.description = description;
        this.landName = landName;
        this.recordCount = recordCount;
        this.isVoted = isVoted;
        this.totalRecTime = totalRecTime;
    }
}
