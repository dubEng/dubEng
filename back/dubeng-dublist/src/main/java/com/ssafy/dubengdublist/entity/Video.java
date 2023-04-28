package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "video")
public class Video extends Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String videoPath;
    private String backgroundPath;
    private String voicePath;
    private Long runtime;
    private String thumbnail;
    private Long startTime;
    private Long endTime;
    private Boolean isAdult;
    private String producer;
    private Long playCount;
    private Boolean gender;
    private String langType;



}
