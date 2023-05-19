package com.ssafy.dubenguser.dto;

import lombok.Data;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@Setter
public class UserCalendarRes {
    List<ZonedDateTime> dates;
}
