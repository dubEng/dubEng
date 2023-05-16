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

    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final MissionRepository missionRepository;
    private final UserMissionRepository userMissionRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     *
     */
    @Override
    public void addUser(UserJoinReq request, String accessToken, String refreshToken){
        if(checkExistNickname(request.getNickname()))
            throw new DuplicateException("이미 등록된 닉네임입니다.");

        //토큰 유효성 검사
        try{
            authService.parseToken(accessToken);
        }catch(Exception e){
            accessToken = authService.reissueATK(refreshToken);
        }

        //parseToken
        String userId = authService.parseToken(accessToken);

        User newUser = User.builder()
                .id(userId)
                .nickname(request.getNickname())
                .description(request.getIntroduce())
                .landName(request.getKitchenName())
                .gender(request.getGender())
                .profileImage(request.getProfileImgUrl())
                // default 설정
                .isPublic(true)
                .isActive(true)
                .isVoted(true)
                .totalRecTime(0L)
                .recordCount(0L)
                .build();

        User savedUser = userRepository.save(newUser);

        for(Long category: request.getCategories()) {
            Optional<Category> nc = categoryRepository.findById(category);

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
    public boolean checkEnrolledMember(String id){

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
    public UserProfileRes findProfile(String userId) {
        Optional<User> findUser = userRepository.findById(userId);

        if(!findUser.isPresent()) 
            throw new NotFoundException("존재하지 않는 유저입니다!");

        User user = findUser.get();

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
    public UserCalendarRes findCalendar(String accessToken, String refreshToken) {
        //토큰 유효성 검사
        try{
            authService.parseToken(accessToken);
        }catch(Exception e){
            accessToken = authService.reissueATK(refreshToken);
        }
        //Token parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new UnAuthorizedException("토큰 파싱과정에서 오류");

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

        //JPA
        List<UserRecordRes> result = userRepository.findRecordByUserId(request.getUserId(), request.getIsPublic(), request.getIsLimit(), request.getLanType());

        if(result == null){
            result = new ArrayList<>();
        }
        return result;
    }

    @Transactional
    public List<RecordLikeRes> findRecordLike(String accessToken, String refreshToken, Boolean isLimit, String langType) {
        //토큰 유효성 검사
        try{
            authService.parseToken(accessToken);
        }catch(Exception e){
            accessToken = authService.reissueATK(refreshToken);
        }

        //Token Parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new UnAuthorizedException("유저 아이디가 없습니다!");

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
    public List<VideoBookmarkRes> findVideoBookmark(String accessToken, String refreshToken, Boolean isLimit, String langType) {
        //토큰 유효성 검사
        try{
            authService.parseToken(accessToken);
        }catch(Exception e){
            accessToken = authService.reissueATK(refreshToken);
        }

        //Token Parsing
        String userId = authService.parseToken(accessToken);
        if(userId == null) throw new UnAuthorizedException("유저 아이디가 없습니다!");

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
