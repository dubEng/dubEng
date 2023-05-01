package com.ssafy.dubengdublist.exception;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorRes {
    @ApiModelProperty(example = "에러메시지")
    private String message;

    public static ErrorRes make(String message) {
        return ErrorRes.builder()
                .message(message)
                .build();
    }

}