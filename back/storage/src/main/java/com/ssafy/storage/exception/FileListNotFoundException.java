package com.ssafy.storage.exception;

public class FileListNotFoundException extends RuntimeException{
    public FileListNotFoundException(){
        super("저장된 Recode 파일들이 없습니다.");
    }
    public FileListNotFoundException(String msg){
        super(msg);
    }
}
