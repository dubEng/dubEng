package com.ssafy.dubenguser.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "video")
public class Video extends Time {
    @Id
    private int id;
    private String title;
    private String videoPath;
    private String backgroundPath;
    private int runtime;
    private String thumbnail;
    private float startTime;
    private float endTime;
    private boolean isAdult;
    private String producer;
    private int playCount;
}
