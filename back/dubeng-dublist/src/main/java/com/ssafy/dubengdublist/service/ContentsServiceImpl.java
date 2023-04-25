package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.contents.RecommendRes;
import com.ssafy.dubengdublist.entity.Video;
import com.ssafy.dubengdublist.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentsServiceImpl implements ContentsService {

    private final VideoRepository videoRepository;

    @Transactional
    public List<RecommendRes> selectAll(){
        List<Video> videoList = videoRepository.findAll();
        List<RecommendRes> boardQaList = new ArrayList<>();
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);

        for(Video v : videoList){

        }

//        for(BoardQaEntity board : boardQaEntities){
//            BoardQaResponseDto boardDto = BoardQaResponseDto.builder()
//                    .id(board.getId())
//                    .memberEntity(board.getMemberEntity())
//                    .writer(board.getWriter())
//                    .memberId(board.getMemberEntity().getMemberId())
//                    .likes(board.getLikes())
//                    .count(board.getCount())
//                    .title(board.getTitle())
//                    .content(board.getContent())
//                    .isActive(board.getIsActive())
//                    .created_date(board.getCreated_date())
//                    .updated_date(board.getUpdated_date())
//                    .build();
//            boardQaList.add(boardDto);
//        }

        return boardQaList;
    }

}
