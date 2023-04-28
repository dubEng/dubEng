package com.ssafy.dubengdublist.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dub_king")
public class DubKing extends Time{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private Long totalVote;
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private ZonedDateTime endDate;
    private Boolean isActive;
    
    public DubKing(User user, Long totalVote, Boolean isActive){
        this.user = user;
        this.totalVote = totalVote;
        this.isActive = isActive;
    }

    public void updateDubKing(Long totalVote){
        this.totalVote = totalVote + 1;
    }

}
