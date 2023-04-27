package com.ssafy.storage.controller;

import com.ssafy.storage.dto.SaveFileRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/dub")
@RequiredArgsConstructor
public class FileController {

    @PostMapping("/upload")
    public void fileUpload(@ModelAttribute SaveFileRequestDTO requestDTO) throws IOException {
        log.debug(requestDTO.toString());

        String fullPath = "";
        String os = System.getProperty("os.name").toLowerCase();

        log.debug("os type : {}", os);
        if(os.contains("win")){
            fullPath = "c:/Home/";
        }else if(os.contains("linux")){
            fullPath = "/Home/";
        }
        if(!requestDTO.getAudioFile().isEmpty()){
            //파일이 있어야

            fullPath += requestDTO.getAudioFile().getOriginalFilename();
            log.debug("file full path : {}",fullPath);
            requestDTO.getAudioFile().transferTo(new File(fullPath));
        }

    }

}
