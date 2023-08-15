package com.ssafy.dubenguser.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class UserMissionRes {
    String title; // 미션 이름
    String assets; // 에셋 내용
    String color; // 미션 고유 컬러
    Long videoId;

    @JsonProperty(value = "isComplete") @Setter
    boolean isComplete;

}
