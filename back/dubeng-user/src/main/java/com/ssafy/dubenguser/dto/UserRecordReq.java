package com.ssafy.dubenguser.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRecordReq {
    String userId;
    Boolean isPublic;
    Boolean isLimit;
    String lanType;
}
