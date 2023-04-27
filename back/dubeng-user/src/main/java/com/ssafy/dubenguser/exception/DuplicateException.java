package com.ssafy.dubenguser.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateException extends RuntimeException {

    public DuplicateException() {
        super("이미 존재하는 데이터입니다.");
    }

    public DuplicateException(String msg) {
        super(msg);
    }
}