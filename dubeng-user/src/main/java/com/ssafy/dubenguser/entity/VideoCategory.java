package com.ssafy.dubenguser.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "video_category")
public class VideoCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name="video_id")
    private Video videoId;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name="catogory_id")
    private Category categoryId;
}
