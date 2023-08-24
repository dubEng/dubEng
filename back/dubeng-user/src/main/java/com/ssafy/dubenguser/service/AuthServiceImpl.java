package com.ssafy.dubenguser.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dubenguser.dto.*;
import com.ssafy.dubenguser.entity.*;
import com.ssafy.dubenguser.exception.DuplicateException;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Value("${kakao.clientId}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.redirectUri}")
    private String REDIRECT_URI;

    @Value("${kakao.baseUrl}")
    private String BASE_URL;

    private final UserRepository userRepository;
    private final UserCalenderRepository userCalenderRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final MissionRepository missionRepository;
    private final UserMissionRepository userMissionRepository;

    public HashMap<String, Object> findAccessToken(String code){

        // 인가 코드를 통해 access-token 요청
        WebClient webClient = WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build();
        log.debug("KAKAO_CLIENT_ID : {}", KAKAO_CLIENT_ID);
        String response = webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth/token")
                        .queryParam("grant_type","authorization_code")
                        .queryParam("client_id",KAKAO_CLIENT_ID)
                        .queryParam("redirect_uri",REDIRECT_URI)
                        .queryParam("code",code)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // parse JSON - Null 처리 해야함.
        HashMap<String, Object> result = parseTokenResponse(response);

        //Null 처리
        if(result.get("access_token") == null) throw new RuntimeException();

        String id = parseToken((String) result.get("access_token"));
        result.put("userId", id);

        //회원이 없다면
        return result;
    }
    public String getKakaoImageUrl(String accessToken){
        log.debug("getKakaoUserInfo ATK : {}", accessToken);

        WebClient webClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com")
                .defaultHeader("Authorization", "Bearer " + accessToken)
                .build();

        String response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/user/me")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // parse JSON
        log.debug(response);

        HashMap<String, Object> result = null;
        if(parseTokenResponse(response).get("properties") != null){
            result = (LinkedHashMap) parseTokenResponse(response).get("properties");
        }
        return (String) result.get("thumbnail_image");
    }

    @Override
    public void kakaoLogout(String accessToken){
        WebClient webClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .defaultHeader("Authorization", "Bearer " + accessToken)
                .build();

        String response = webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/user/logout")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("로그아웃 정보 : {}", response);
    }

    @Override
    public String reissueATK(String refreshToken) {
        WebClient webClient = WebClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build();
        log.debug("KAKAO_CLIENT_ID : {}", KAKAO_CLIENT_ID);
        String response = webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth/token")
                        .queryParam("grant_type","refresh_token")
                        .queryParam("client_id",KAKAO_CLIENT_ID)
                        .queryParam("refresh_token",refreshToken)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("Refresh : {}", response);

        HashMap<String, Object> responseMap = parseTokenResponse(response);

        if(responseMap.get("access_token") == null){
            throw new UnAuthorizedException("리프레시 토큰 만료");
        }
        String accessToken = (String) responseMap.get("access_token");

        return accessToken;
    }
    @Override
    public Set<String> getAttendanceByMonth(String accessToken, int month){
        String userId = parseToken(accessToken);

        List<UserCalendar> list = userCalenderRepository.findByUserIdAndMonth(userId, month);

        Set<String> dateList = new HashSet<>();
        for (UserCalendar userCalendar : list) {
            //DateFormat
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            String date = userCalendar.getCalDate().format(formatter);

            dateList.add(date);
        }

        return dateList;
    }
    /**
     * 출석하기
     */
    private void saveAttendance(String userId, String nowDate, int month){

        //먼저 검색
        List<UserCalendar> attendanceList = userCalenderRepository.findByUserIdAndMonth(userId, month);

        for (UserCalendar userCalendar : attendanceList) {
            // Define the desired date format
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // Format the ZonedDateTime object using the formatter
            String formattedDateTime = userCalendar.getCalDate().format(formatter);

            if(formattedDateTime.equals(nowDate)) return;
        }
        User user = new User();
        user.setId(userId);

        UserCalendar userCalendar = new UserCalendar();
        userCalendar.setUser(user);
        userCalendar.setMonth(month);

        userCalenderRepository.save(userCalendar);
    }
    /**
     * accessToken을 받아
     * kakao Auth 서버에 parse 요청
     */
    @Override
    public String parseToken(String accessToken){
            WebClient webClient = WebClient.builder()
                    .baseUrl("https://kapi.kakao.com")
                    .defaultHeader("Authorization", "Bearer " + accessToken)
                    .build();

            String response = webClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1/user/access_token_info")
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

        // parse JSON
        HashMap<String, Object> result = parseTokenResponse(response);

        //Null 처리
        if(result.get("id") == null) throw new RuntimeException();
        Long id = (Long) result.get("id");
        log.debug("{}",id);

        return Long.toString(id);
    }

    /**
     * @Param response : kakao로 부터 받은 데이터
     * 파싱해서 Map 형태로 Return
     */
    private HashMap<String, Object> parseTokenResponse(String response) {
        log.debug(response);
        HashMap<String, Object> result = null;

        try{
            result = new ObjectMapper().readValue(response, HashMap.class);
            log.debug(result.toString());
        }catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        log.debug("parse result : {}", result.toString());
        return result;
    }
    @Override
    public UserLoginRes findUser(String userId){
        log.debug("findUser :: userId : {}", userId);

        // 회원 정보 가져오기
        Optional<User> findUser = userRepository.findById(userId);
        if(!findUser.isPresent()) throw new UnAuthorizedException();

        User loginUser = findUser.get();

        //탈퇴한 회원일 경우 접근 제한
        if(!loginUser.getIsActive())
            throw new UnAuthorizedException("이미 탈퇴한 회원입니다!");

        // 출석하기
        LocalDateTime currentDateTime = LocalDateTime.now();

        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("MM");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        int month = Integer.parseInt(currentDateTime.format(formatter1));
        String nowDate = currentDateTime.format(formatter2);

        saveAttendance(userId, nowDate, month);

        UserLoginRes userLoginRes = UserLoginRes.builder()
                .userId(userId)
                .nickname(loginUser.getNickname())
                .imageUrl(loginUser.getProfileImage())
                .kitchenName(loginUser.getLandName())
                .build();

        return userLoginRes;
    }
    @Override
    public void addUser(UserJoinReq request, String userId){
        log.debug("addUser : userId : {}", userId);
        if(checkExistNickname(request.getNickname()))
            throw new DuplicateException("이미 등록된 닉네임입니다.");

        //탈퇴한 회원일 경우 접근 제한
        if(checkEnrolledMember(userId))
            throw new DuplicateException("이미 가입한 회원입니다.");

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

    @Override
    @Transactional
    public void quitUser(String userId) {
        Optional<User> findUser = userRepository.findById(userId);
        if(!findUser.isPresent()) throw new UnAuthorizedException("존재하지 않는 유저입니다!");

        User loginUser = findUser.get();

        //탈퇴 처리하기
        loginUser.updateUserQuit();
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

    @Override
    public List<Category> getCategoryList() {
        List<Category> findList = categoryRepository.findAll();
        return findList;
    }
}
