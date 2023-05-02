package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.*;
import com.ssafy.dubenguser.exception.DuplicateException;
import com.ssafy.dubenguser.exception.InvalidInputException;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final MissionRepository missionRepository;
    private final UserMissionRepository userMissionRepository;

    /**
     *
     */
    public void addUser(UserJoinReq request){
        if(checkExistNickname(request.getNickname()))
            throw new DuplicateException("이미 등록된 닉네임입니다.");

        User newUser = User.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .description(request.getDescription())
                .landName(request.getLandName())
                .build();

        User savedUser = userRepository.save(newUser);

        for(String category: request.getCategories()) {
            Optional<Category> nc = categoryRepository.findByName(category);

            if(!nc.isPresent())
                throw new NotFoundException("존재하지 않는 카테고리입니다!");

            UserCategory uc = UserCategory.builder()
                    .category(nc.get())
                    .user(savedUser)
                    .build();

            userCategoryRepository.save(uc);
        }

        List<Mission> missionList = missionRepository.findAll();

        for(Mission m: missionList) {
            userMissionRepository.save(UserMission.builder().user(savedUser).mission(m).build());
        }
    }

    /**
     *  DB로 부터 이미 등록된 회원인지 확인
     *  false : 등록된 회원이 없다.
     *  true : 등록된 회원이 있다.
     */
    public boolean checkEnrolledMember(Long id){

        Optional<User> member = userRepository.findById(id);

        // Null = 회원이 없다는 뜻.
        if(!member.isPresent()) return false;

        log.debug("회원 있어유~");
        return true;
    }

    public boolean checkExistNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);

        if (user.isPresent()){  // 이미 닉네임 존재
            return true;
        }

        return false;
    }

    @Transactional
    public UserProfileRes findProfile(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }

        List<Category> categories = userRepository.findCategoriesByUserId(user.get().getId());

        List<UserCategoryRes> categoryList = new ArrayList<>();

        for(Category c: categories) {
            UserCategoryRes res = new UserCategoryRes();
            res.setCategoryName(c.getName());
            categoryList.add(res);
        }

        UserProfileRes result = UserProfileRes.builder()
                .totalRecTime(user.get().getTotalRecTime())
                .recordCount(user.get().getRecordCount())
                .category(categoryList)
                .build();

        return result;
    }

    @Transactional
    public UserCalendarRes findCalendar(Long userId) {
        ZonedDateTime today = ZonedDateTime.now();
        ZonedDateTime startDate = today.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        ZonedDateTime endDate = today.withDayOfMonth(today.getMonth().maxLength()).withHour(23).withMinute(59).withSecond(59).withNano(999_999_999);

        List<UserCalender> userCalendars = userRepository.findCalenderByUserId(userId, startDate, endDate);
        List<ZonedDateTime> res = new ArrayList<>();

        for(UserCalender uc: userCalendars) {
            res.add(uc.getCalDate());
        }

        UserCalendarRes result = new UserCalendarRes();
        result.setDates(res);

        return result;
    }

    @Transactional
    public List<UserRecordRes> findRecord(Long userId, UserRecordReq request) {
        if(request.getIsPublic()==null || request.getIsLimit()==null || request.getLanType()==null)
            throw new InvalidInputException("모든 값을 채워주세요!");

        List<UserRecordRes> result = userRepository.findRecordByUserId(userId, request.getIsPublic(), request.getIsLimit(), request.getLanType());
        return result;
    }

    @Transactional
    public List<RecordLikeRes> findRecordLike(Long userId, Boolean isLimit) {
        List<RecordLikeRes> result = userRepository.findLikedRecordByUserId(userId, isLimit);
        return result;
    }

    @Transactional
    public List<VideoBookmarkRes> findVideoBookmark(Long userId, Boolean isLimit) {
        List<VideoBookmarkRes> result = userRepository.findBookmarkedVideoByUserId(userId, isLimit);
        return result;
    }

}
