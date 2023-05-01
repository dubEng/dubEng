package com.ssafy.storage.controller;

import com.ssafy.storage.dto.SaveFileRequestDTO;
import com.ssafy.storage.service.SaveFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class FileController {
    private final SaveFileService fileService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void fileUpload(@ModelAttribute SaveFileRequestDTO requestDTO) throws IOException {
        log.debug(requestDTO.toString());

        fileService.fileSave(requestDTO);
    }
    @GetMapping("/dublist")
    public ResponseEntity<Set<Object>> getfilePath(@RequestParam Long videoId, @RequestParam String nickname){
        log.debug("videoId : {}, userId : {}", videoId, nickname);

        String key = fileService.getKey(videoId, nickname);

        Set<Object> pathList = fileService.getPathInCache(key);

        return new ResponseEntity<Set<Object>>(pathList, HttpStatus.OK);
    }
}
