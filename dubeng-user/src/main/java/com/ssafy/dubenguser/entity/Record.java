package com.ssafy.dubenguser.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "record")
public class Record extends Time{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Video video;

    private Boolean  isPublic;
    private Boolean  isActive;
    private long playCount;
    private String recordPath;
    private long likeCount;
    private long voteCount;

}
