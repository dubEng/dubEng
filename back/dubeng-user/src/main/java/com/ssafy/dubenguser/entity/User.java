package com.ssafy.dubenguser.entity;

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
    private Boolean  IsVoted;
    private Long totalRecTime;

}
