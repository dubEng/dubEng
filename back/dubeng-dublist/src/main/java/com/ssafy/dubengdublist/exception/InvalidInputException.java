package com.ssafy.dubengdublist.exception;


public class InvalidInputException extends RuntimeException {

    public InvalidInputException() {
        super("잘못된 입력값입니다.");
    }

    public InvalidInputException(String msg) {
        super(msg);
    }
}
