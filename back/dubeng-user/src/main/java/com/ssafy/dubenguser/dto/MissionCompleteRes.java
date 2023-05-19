package com.ssafy.dubenguser.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MissionCompleteRes {
    String title; // 미션 이름
    String assets; // 에셋 내용
    String color; // 미션 고유 컬러
}
