package com.ssafy.storage.exception;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorRes {
    @ApiModelProperty(example = "Error Message")
    private String message;

    public static ErrorRes make(String message){
        return ErrorRes.builder()
                .message(message)
                .build();
    }
}
