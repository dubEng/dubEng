package com.ssafy.dubengdublist.entity;

import com.ssafy.dubengdublist.repository.VideoBookmarkRepository;
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
    private Long id;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name="video_id")
    private Video video;
    private Boolean isActive;

    public VideoBookmark(User user, Video video, Boolean isActive){
        this.user = user;
        this.video = video;
        this.isActive = isActive;
    }

    public void updateVideoBookmark(Boolean isActive) {
        this.isActive = !isActive;
    }
}
