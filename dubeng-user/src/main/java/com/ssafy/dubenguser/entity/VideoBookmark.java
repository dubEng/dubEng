package com.ssafy.dubenguser.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "video_bookmark")
public class VideoBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name="video_id")
    private Video videoId;
    private Boolean isActive;
}
