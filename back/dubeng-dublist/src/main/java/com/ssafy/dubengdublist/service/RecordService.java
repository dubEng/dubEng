package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScriptRes;
import com.ssafy.dubengdublist.dto.record.RecordVideoRes;

import java.util.List;

public interface RecordService {

    public RecordVideoRes findRecordVideo(Long videoId);

    public List<RecordScriptRes> findRecordScript(Long videoId);
}
