package com.ssafy.dubenguser.dto;

import com.ssafy.dubenguser.entity.Video;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMissionRes {
    private String title; // 미션 이름
    private String assets; // 에셋 내용
    private String color; // 미션 고유 컬러
    private Long videoId;
    private boolean isComplete;
}
