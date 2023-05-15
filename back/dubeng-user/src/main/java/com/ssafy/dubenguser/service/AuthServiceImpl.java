package com.ssafy.dubenguser.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dubenguser.dto.Token;
import com.ssafy.dubenguser.dto.UserLoginReq;
import com.ssafy.dubenguser.dto.UserLoginRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.exception.UnAuthorizedException;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Value("${kakao.clientId}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.redirectUri}")
    private String REDIRECT_URI;

    private final UserRepository userRepository;
    
    public HashMap<String, Object> findAccessToken(String code){

        // 인가 코드를 통해 access-token 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://kauth.kakao.com")
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
    public UserLoginRes findUser(String accessToken){
        //토큰파싱
        String userId = parseToken(accessToken);

        log.debug("userId : {}", userId);
        // 회원 정보 가져오기
        Optional<User> findUser = userRepository.findById(userId);
        if(!findUser.isPresent()) throw new UnAuthorizedException();

        User loginUser = findUser.get();

        // 출석하기

        UserLoginRes userLoginRes = UserLoginRes.builder()
                .userId(userId)
                .accessToken(accessToken)
                .nickname(loginUser.getNickname())
                .imageUrl(loginUser.getProfileImage())
                .build();

        return userLoginRes;
    }

    /**
     * 출석하기
     */
    private void setAttendance(){

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
     * refreshToken 을 통하여 token 갱신
     * ATK RTK 둘 다 갱신된다.
     */
    public Token requestRefresh(Token requestDTO){
        //
        WebClient webClient = WebClient.builder()
                .baseUrl("https://kauth.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build();

        String response = webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth/token")
                        .queryParam("grant_type","refresh_token")
                        .queryParam("client_id",KAKAO_CLIENT_ID)
                        .queryParam("refresh_token",requestDTO.getRefreshToken())
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // parse JSON
        HashMap<String, Object> result = parseTokenResponse(response);

        String refresh_token = requestDTO.getRefreshToken();

        //기존 리프레시 토큰의 유효기간이 1개월 미만인 경우에만 갱신
        if(result.get("refresh_token") != null){
            refresh_token = (String) result.get("refresh_token");
        }
        Token responseDTO = new Token((String) result.get("access_token"), refresh_token);

        return responseDTO;
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
