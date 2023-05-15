package com.ssafy.dubenguser.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "user")
@Setter
public class User extends Time{

    @Id
    private String id;
    private String email;
    private String nickname;
    private Boolean isActive;
    private String profileImage;
    private Boolean isPublic;
    private String roleType;
    private String description;
    private String landName;
    private Long recordCount;
    private Boolean isVoted;
    private Long totalRecTime;
    private Boolean gender;

    @Builder
    public User(String id, String email, String nickname, Boolean isActive, String profileImage, Boolean isPublic, String roleType, String description, String landName, Long recordCount, Boolean isVoted, Long totalRecTime, Boolean gender) {
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
        this.gender = gender;
    }
}
