package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScriptPitchRes;
import com.ssafy.dubengdublist.dto.record.RecordScriptRes;
import com.ssafy.dubengdublist.dto.record.RecordVideoRes;
import com.ssafy.dubengdublist.entity.User;
import com.ssafy.dubengdublist.entity.Video;
import com.ssafy.dubengdublist.exception.NotFoundException;
import com.ssafy.dubengdublist.repository.UserRepository;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    public RecordVideoRes findRecordVideo(Long videoId, String userId){
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if(!optionalVideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        Video video = optionalVideo.get();

        Optional<User> optionalUser = userRepository.findById(userId);

        if(!optionalUser.isPresent())
            throw new NotFoundException("존재하지 않는 유저입니다!");

        Long totalRecordCount = optionalUser.get().getRecordCount();
        Long totalRecordTime = optionalUser.get().getTotalRecTime();

        return RecordVideoRes.builder()
                .id(video.getId())
                .title(video.getTitle())
                .videoPath(video.getVideoPath())
                .startTime(video.getStartTime())
                .endTime(video.getEndTime())
                .langType(video.getLangType())
                .totalRecordCount(totalRecordCount)
                .totalRecordTime(totalRecordTime)
                .runtime(video.getRuntime())
                .build();
    }

    public List<RecordScriptPitchRes> findRecordScript(Long videoId){
        Optional<Video> optionalVideo = videoRepository.findById(videoId);
        if(!optionalVideo.isPresent()){
            throw new NotFoundException("존재하지 않는 비디오입니다!");
        }
        return videoRepository.findByRecordScript(videoId);
    }

}
