package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScriptRes;
import com.ssafy.dubengdublist.dto.record.RecordVideoRes;
import com.ssafy.dubengdublist.entity.Video;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final VideoRepository videoRepository;

    public RecordVideoRes findRecordVideo(Long videoId){
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if(!optionalVideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        Video video = optionalVideo.get();
        RecordVideoRes recordVideoRes = RecordVideoRes.builder()
                .id(video.getId())
                .title(video.getTitle())
                .videoPath(video.getVideoPath())
                .startTime(video.getStartTime())
                .endTime(video.getEndTime())
                .build();

        return recordVideoRes;
    }

    public List<RecordScriptRes> findRecordScript(Long videoId){
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if(!optionalVideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        List<RecordScriptRes> recordScriptRes = videoRepository.findByRecordScript(videoId);
        return recordScriptRes;
    }

}
