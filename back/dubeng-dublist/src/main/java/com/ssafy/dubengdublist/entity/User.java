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
    private String isActive;
    private String profileImage;
    private String isPublic;
    private String roleType;
    private String description;
    private String landName;
    private String recordCount;
    private Long IsVoted;
    private Long totalRecTime;

    public void updateDubKingUser(Long IsVoted){
        this.IsVoted = IsVoted + 1;
    }

}
