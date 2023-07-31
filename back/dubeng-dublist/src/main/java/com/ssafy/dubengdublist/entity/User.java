package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
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
    private Long isVoted;
    private Long totalRecTime;
    private Boolean gender;

    public void updateDubKingUser(Long isVoted){
        this.isVoted = isVoted + 1;
    }

}
