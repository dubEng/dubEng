package com.ssafy.dubenguser.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserCalendarRes;
import com.ssafy.dubenguser.dto.UserLoginReq;
import com.ssafy.dubenguser.dto.UserLoginRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.entity.UserCalendar;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.repository.UserCalenderRepository;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
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

    private final UserRepository userRepository;
    private final UserCalenderRepository userCalenderRepository;
    private String baseUrl = "https://kauth.kakao.com";


    public HashMap<String, Object> findAccessToken(String code){

        // 인가 코드를 통해 access-token 요청
        WebClient webClient = WebClient.builder()
                .baseUrl(baseUrl)
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
                .baseUrl(baseUrl)
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
    public UserLoginRes findUser(String accessToken, String refreshToken){
        //토큰파싱
        try{
            parseToken(accessToken);
        }catch(Exception e){
            accessToken = reissueATK(refreshToken);
        }
        String userId = parseToken(accessToken);

        log.debug("userId : {}", userId);
        // 회원 정보 가져오기
        Optional<User> findUser = userRepository.findById(userId);
        if(!findUser.isPresent()) throw new UnAuthorizedException();

        User loginUser = findUser.get();

        // 출석하기
        LocalDateTime currentDateTime = LocalDateTime.now();

        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("MM");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        int month = Integer.parseInt(currentDateTime.format(formatter1));
        String nowDate = currentDateTime.format(formatter2);

        saveAttendance(userId, nowDate, month);

        UserLoginRes userLoginRes = UserLoginRes.builder()
                .userId(userId)
                .accessToken(accessToken)
                .nickname(loginUser.getNickname())
                .imageUrl(loginUser.getProfileImage())
                .kitchenName(loginUser.getLandName())
                .build();

        return userLoginRes;
    }
    public Set<String> getAttendanceByMonth(String accessToken,String refreshToken, int month){
        //토큰파싱
        try{
            parseToken(accessToken);
        }catch(Exception e){
            accessToken = reissueATK(refreshToken);
        }
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
}
