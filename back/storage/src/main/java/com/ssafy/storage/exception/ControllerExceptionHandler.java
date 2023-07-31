package com.ssafy.storage.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.FileNotFoundException;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(FileListNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorRes handlerFileListNotFoundException(FileListNotFoundException e){
        log.error(e.getMessage());
        return ErrorRes.make(e.getMessage());
    }

    @ExceptionHandler(FileNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorRes handlerFileNotFoundException(FileNotFoundException e){
        log.error(e.getMessage());
        return ErrorRes.make(e.getMessage());
    }
}
