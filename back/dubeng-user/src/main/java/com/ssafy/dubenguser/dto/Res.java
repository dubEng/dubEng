package com.ssafy.dubenguser.dto;

import lombok.Data;

@Data
public class Res<T> {
    private int statusCode;
    private T Data;

    private String message;
}
