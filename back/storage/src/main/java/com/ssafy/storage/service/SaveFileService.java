package com.ssafy.storage.service;

import com.ssafy.storage.dto.SaveFileRequestDTO;
import com.ssafy.storage.dto.UserProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
            fullPath = "c:/Home/";
        }else if(os.contains("linux")){
            fullPath = "/Home/";
        }
        // 폴더 없을 경우 생성
        UserProfile userProfile = requestDTO.getUserProfile();

        String key = userProfile.getVideoId() + "_" + userProfile.getUserId();
        fullPath += key;

        File folder = new File(fullPath);
        if(!folder.exists()){
            folder.mkdir(); //폴더 생성
            log.debug("Create Folder : {}", fullPath);
        }

        //파일이 없다면 에러 발생
        if(requestDTO.getAudioFile().isEmpty()) throw new RuntimeException();


        fullPath += "/" + requestDTO.getAudioFile().getOriginalFilename();
        log.debug("file full path : {}", fullPath);

        // Save File
        requestDTO.getAudioFile().transferTo(new File(fullPath));

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
    public Set<Object> getPathInCache(String key){
        Set<Object> members = redisTemplate.opsForSet().members(key);
        log.debug("list : {}", members.toString());
        return members;
    }
}
