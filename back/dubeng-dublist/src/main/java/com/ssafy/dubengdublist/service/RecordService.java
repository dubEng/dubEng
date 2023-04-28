package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScript;
import com.ssafy.dubengdublist.dto.record.RecordVideo;

import java.util.List;

public interface RecordService {

    public RecordVideo selectRecordVideo(Long videoId);

    public List<RecordScript> selectRecordScript(Long videoId);
}
