package com.ssafy.dubengdublist.entity;

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
    private Long id;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    private Boolean  isPublic;
    private Boolean  isActive;
    private Long playCount;
    private String recordPath;
    private Long likeCount;
    private Long voteCount;

    public void updateLikeCount(Boolean likeIsActive, Long likeCount){
        if (likeIsActive){ // 눌림
            this.likeCount = likeCount + 1;
        }else { // 안눌림
            this.likeCount = likeCount - 1;
        }
    }

}
