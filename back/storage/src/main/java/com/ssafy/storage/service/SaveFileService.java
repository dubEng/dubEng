package com.ssafy.storage.service;

import com.ssafy.storage.dto.SaveFileRequestDTO;
import com.ssafy.storage.dto.RecordInfo;
import com.ssafy.storage.exception.FileListNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SaveFileService {
    private final RedisTemplate<String, Object> redisTemplate;

    public void fileSave(SaveFileRequestDTO requestDTO) throws IOException {
        String fullPath = "";

        // OS 확인
        String os = System.getProperty("os.name").toLowerCase();
        log.debug("os type : {}", os);

        if(os.contains("win")){
            fullPath = "c:/home/ubuntu/file_volume/";
        }else if(os.contains("linux")){
            fullPath = "/home/ubuntu/file_volume/";
        }
        // 폴더 없을 경우 생성
        RecordInfo recordInfo = requestDTO.getRecordInfo();

        String key = getKey(recordInfo.getVideoId(), recordInfo.getNickname());
        fullPath += key;

        File folder = new File(fullPath);
        if(!folder.exists()){
            folder.mkdir(); //폴더 생성
            log.debug("Create Folder : {}", fullPath);
        }

        // getFileName
        MultipartFile audioFile = requestDTO.getAudioFile();
        if(audioFile == null) throw new FileNotFoundException();

        String fileName = audioFile.getOriginalFilename();
        log.debug("fileName : {}", fileName);

        String fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

        char newRecordNum='a';
        if(recordInfo.getRecordNum() >= 10) {
            newRecordNum = (char) (87 + recordInfo.getRecordNum());
        }

        String newFileName = recordInfo.getVideoId() + "_" + recordInfo.getNickname() + "_" + newRecordNum + "." + fileExtension;

        fullPath += "/" + newFileName;
        log.debug("file full path : {}", fullPath);

        // Save File
        // window에서 Exception
        try{
            requestDTO.getAudioFile().transferTo(new File(fullPath));
        }catch (FileNotFoundException e){
            throw new FileNotFoundException("파일 경로가 잘못되었습니다.");
        }

        //파일 저장이 완료된다면 캐시에 경로 저장
        setPathInCache(key, fullPath);
    }

    /**
     *  Redis에 Set 형태로 저장
     *  key : {videoId}_{userId}
     *  value : audio_path
     */
    public void setPathInCache(String key, String path){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        setOperations.add(key, path);

        log.debug("cache 입력 완료");
    }

    /**
     *  Redis 에 저장된 임시 저장된 Recode File Path list 가져오기
     */
    public List<String> getPathInCache(String key){
        Set<Object> members = redisTemplate.opsForSet().members(key);
        if(members.isEmpty()) throw new FileListNotFoundException();

        // Sort
        ArrayList<String> fileList = new ArrayList<>();
        for (Object o : members) {
            fileList.add(o.toString());
        }
        Collections.sort(fileList);

        return fileList;
    }
    public String getKey(Long videoId, String nickname){
        String key = new StringBuilder()
                .append(videoId)
                .append("_")
                .append(nickname).toString();

        return key;
    }
}
