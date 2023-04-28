package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScript;
import com.ssafy.dubengdublist.dto.record.RecordVideo;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final VideoRepository videoRepository;

    public RecordVideo selectRecordVideo(Long videoId){
        RecordVideo recordVideo = videoRepository.selectRecordVideo(videoId);
        return recordVideo;
    }

    public List<RecordScript> selectRecordScript(Long videoId){
        List<RecordScript> recordScript = videoRepository.selectRecordScript(videoId);
        return recordScript;
    }

}
