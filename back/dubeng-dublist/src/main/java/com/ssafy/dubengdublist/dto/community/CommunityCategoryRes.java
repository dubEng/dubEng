package com.ssafy.dubengdublist.dto.community;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommunityCategoryRes {
    private Long id;
    private String name;

    public CommunityCategoryRes(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
