package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_mission")
public class UserMission extends Time{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Mission.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private Mission mission;

    private Boolean isComplete;
}
