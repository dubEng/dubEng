package com.ssafy.dubenguser.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserMissionRes {
    Long videoId;
    String title; // 미션 이름
    String assets; // 에셋 내용
    String color; // 미션 고유 컬러
    Boolean isComplete; // 완료 여부

}
