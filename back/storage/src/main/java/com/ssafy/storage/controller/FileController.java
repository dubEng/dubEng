package com.ssafy.storage.controller;

import com.ssafy.storage.dto.SaveFileRequestDTO;
import com.ssafy.storage.service.SaveFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/dub")
@RequiredArgsConstructor
public class FileController {
    private final SaveFileService fileService;

    @PostMapping("/upload")
    public void fileUpload(@ModelAttribute SaveFileRequestDTO requestDTO) throws IOException {
        log.debug(requestDTO.toString());

        fileService.fileSave(requestDTO);
    }
    @GetMapping("/get/file")
    public Set<Object> getfilePath(@RequestParam String videoId, @RequestParam String userId){
        log.debug("videoId : {}, userId : {}", videoId, userId);

        String key = videoId + "_" + userId;
        Set<Object> pathList = fileService.getPathInCache(key);

        return pathList;
    }
}
