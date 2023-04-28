package com.ssafy.dubenguser.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRecordReq {
    Boolean isPublic;
    Boolean isLimit;
    String lanType;
}
