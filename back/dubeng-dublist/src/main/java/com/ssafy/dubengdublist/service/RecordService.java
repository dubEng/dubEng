package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.record.RecordScriptPitchRes;
import com.ssafy.dubengdublist.dto.record.RecordScriptRes;
import com.ssafy.dubengdublist.dto.record.RecordVideoRes;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RecordService {

    public RecordVideoRes findRecordVideo(Long videoId, String userId);

    public List<RecordScriptPitchRes> findRecordScript(Long videoId);
}
