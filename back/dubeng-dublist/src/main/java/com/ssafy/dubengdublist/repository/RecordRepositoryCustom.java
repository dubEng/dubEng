package com.ssafy.dubengdublist.repository;

public interface RecordRepositoryCustom {
    public void updatePlayCount(Long recordId, Long cnt);
    public Long findPlayCount(Long recordId);
}
