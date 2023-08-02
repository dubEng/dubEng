package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.*;
import com.ssafy.dubenguser.exception.DuplicateException;
import com.ssafy.dubenguser.exception.InvalidInputException;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthServiceImpl authService;
    private final RedisTemplate<String, Object> redisTemplate;
    private String quitUser = "탈퇴한 회원입니다!";
    @Transactional
    public UserProfileRes findProfile(String userId) {
        Optional<User> foundUser = userRepository.findById(userId);

        if(!foundUser.isPresent()) 
            throw new NotFoundException("존재하지 않는 유저입니다!");

        if(!foundUser.get().getIsActive())
            throw new InvalidInputException(quitUser);

        User user = foundUser.get();

        List<Category> categories = userRepository.findCategoriesByUserId(user.getId());

        List<UserCategoryRes> categoryList = new ArrayList<>();

        for(Category c: categories) {
            UserCategoryRes res = new UserCategoryRes();
            res.setCategoryName(c.getName());
            categoryList.add(res);
        }

        UserProfileRes result = UserProfileRes.builder()
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .description(user.getDescription())
                .totalRecTime(user.getTotalRecTime())
                .recordCount(user.getRecordCount())
                .category(categoryList)
                .build();

        return result;
    }

    @Transactional
    public UserCalendarRes findCalendar(String accessToken) {
        //Token parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new UnAuthorizedException("토큰 파싱과정에서 오류");

        Optional<User> foundUser = userRepository.findById(userId);

        if(!foundUser.isPresent())
            throw new NotFoundException("존재하지 않는 유저입니다!");

        if(!foundUser.get().getIsActive())
            throw new InvalidInputException(quitUser);

        ZonedDateTime today = ZonedDateTime.now();
        ZonedDateTime startDate = today.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        ZonedDateTime endDate = today.withDayOfMonth(today.getMonth().maxLength()).withHour(23).withMinute(59).withSecond(59).withNano(999_999_999);

        List<UserCalendar> userCalendars = userRepository.findCalendarByUserId(userId, startDate, endDate);
        List<ZonedDateTime> res = new ArrayList<>();

        for(UserCalendar uc: userCalendars) {
            res.add(uc.getCalDate());
        }

        UserCalendarRes result = new UserCalendarRes();
        result.setDates(res);

        return result;
    }

    @Transactional
    public List<UserRecordRes> findRecord(UserRecordReq request) {

        if(request.getUserId()==null || request.getIsPublic()==null || request.getIsLimit()==null || request.getLanType()==null)
            throw new InvalidInputException("모든 값을 채워주세요!");

        Optional<User> foundUser = userRepository.findById(request.getUserId());

        if(!foundUser.isPresent())
            throw new NotFoundException("존재하지 않는 유저입니다!");

        if(!foundUser.get().getIsActive())
            throw new InvalidInputException(quitUser);

        List<UserRecordRes> result = userRepository.findRecordByUserId(request.getUserId(), request.getIsPublic(), request.getIsLimit(), request.getLanType());

        if(result == null){
            result = new ArrayList<>();
        }
        return result;
    }

    @Transactional
    public List<RecordLikeRes> findRecordLike(String accessToken, Boolean isLimit, String langType) {
        //Token Parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new InvalidInputException("유저 아이디가 없습니다!");

        Optional<User> foundUser = userRepository.findById(userId);

        if(!foundUser.isPresent())
            throw new NotFoundException("존재하지 않는 유저입니다!");

        if(!foundUser.get().getIsActive())
            throw new InvalidInputException(quitUser);

        // Redis Set
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "like_userId::"+userId;
        Set<Object> rmembers = setOperations.members(key);
        List<Long> recordIds = rmembers.stream()
                .map(String::valueOf)
                .map(Long::valueOf)
                .collect(Collectors.toList());
        List<RecordLikeRes> result = userRepository.findLikedRecordByUserId(userId, isLimit,recordIds, langType);

        if(result == null){
            result = new ArrayList<>();
        }
        return result;
    }

    @Transactional
    public List<VideoBookmarkRes> findVideoBookmark(String accessToken, Boolean isLimit, String langType) {
        //Token Parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new InvalidInputException("유저 아이디가 없습니다!");

        Optional<User> foundUser = userRepository.findById(userId);

        if(!foundUser.isPresent())
            throw new NotFoundException("존재하지 않는 유저입니다!");

        if(!foundUser.get().getIsActive())
            throw new InvalidInputException(quitUser);

        // Redis Set
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        String key = "scrap_userId::"+userId;
        Set<Object> rmembers = setOperations.members(key);
        List<Long> videoIds = rmembers.stream()
                .map(String::valueOf)
                .map(Long::valueOf)
                .collect(Collectors.toList());
        List<VideoBookmarkRes> result = userRepository.findBookmarkedVideoByUserId(userId, isLimit, videoIds, langType);

        if(result == null){
            result = new ArrayList<>();
        }
        return result;
    }

}
