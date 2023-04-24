package com.ssafy.dubenguser.entity;

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
    private int id;
    private String title;
    private String videoPath;
    private String backgroundPath;
    private int runtime;
    private String thumbnail;
    private float startTime;
    private float endTime;
    private Boolean isAdult;
    private String producer;
    private int playCount;
    private Boolean gender;
}
