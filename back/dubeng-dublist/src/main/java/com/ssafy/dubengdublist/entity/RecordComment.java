package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "record_comment")
public class RecordComment extends Time{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Record.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id")
    private Record record;
    private Boolean isActive;
    private String content;

    public RecordComment(User user, Record record, Boolean isActive, String content){
        this.user = user;
        this.record = record;
        this.isActive = isActive;
        this.content = content;
    }

    public void updateComment(String content){
        this.content = content;
    }

    public void deleteComment() {
        this.isActive = true;
    }
}
