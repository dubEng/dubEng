package com.ssafy.storage.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SaveFileRequestDTO {
    private MultipartFile audioFile;
    private RecodeInfo recodeInfo;
}
