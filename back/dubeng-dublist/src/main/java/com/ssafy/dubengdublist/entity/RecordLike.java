package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "record_like")
public class RecordLike extends Time{

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

    public RecordLike(User user, Record record, Boolean isActive){
        this.user = user;
        this.record = record;
        this.isActive = isActive;
    }

    public void updateRecordLike(Boolean isActive){
        this.isActive = !isActive;
    }

}
