package com.ssafy.dubengdublist.exception;

public class UnAuthorizedException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;

    public UnAuthorizedException() {
        super("계정 권한이 유효하지 않습니다.\n다시 로그인을 해주세요.");
    }

    public UnAuthorizedException(String message){
        super(message);
    }
}