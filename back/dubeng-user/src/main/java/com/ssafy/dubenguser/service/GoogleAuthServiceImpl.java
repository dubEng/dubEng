package com.ssafy.dubenguser.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dubenguser.dto.GoogleOAuthToken;
import com.ssafy.dubenguser.dto.GoogleOAuthUserInfo;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class GoogleAuthServiceImpl implements GoogleAuthService{
    private final UserRepository userRepository;

    @Value("${google.client_id}")
    private String GOOGLE_CLIENT_ID;

    @Value("${google.client_secret}")
    private String GOOGLE_CLIENT_SECRET;

    @Value("${google.redirect_uri}")
    private String GOOGLE_REDIRECT_URI;

    @Value("${google.baseUrl}")
    private String GOOGLE_BASE_URL;
    @Override
    public GoogleOAuthToken findAccessToken(String code) {
        WebClient webClient = WebClient.builder()
                .baseUrl(GOOGLE_BASE_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build();

        String response = webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/token")
                        .queryParam("grant_type","authorization_code")
                        .queryParam("client_id",GOOGLE_CLIENT_ID)
                        .queryParam("client_secret",GOOGLE_CLIENT_SECRET)
                        .queryParam("redirect_uri",GOOGLE_REDIRECT_URI)
                        .queryParam("code",code)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.debug(response);

        // parse JSON - Null 처리 해야함.
        GoogleOAuthToken googleOAuthToken = null;
        try{
            googleOAuthToken = new ObjectMapper().readValue(response, GoogleOAuthToken.class);
            log.debug(googleOAuthToken.toString());
        }catch (JsonProcessingException e) {
            log.error("Google Login Response Parse Error");
            throw new RuntimeException(e);
        }

        //회원이 없다면
        return googleOAuthToken;
    }
    /**
     * Token 정보를 이용해 구글 계정 정보를 가져오기
     */
    @Override
    public String parseGoogleToken(String accessToken){
        WebClient webClient = WebClient.builder()
                .baseUrl("https://www.googleapis.com")
                .defaultHeader("Authorization", "Bearer " + accessToken)
                .build();

        String response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2/v2/userinfo")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.debug("parse Info : {}", response);

        return response;
    }

    @Override
    public boolean isExistUser(String accessToken) {
        GoogleOAuthUserInfo googleOAuthUserInfo = parseGoogleJson(accessToken);

        Optional<User> findUser = userRepository.findById(googleOAuthUserInfo.getId());

        if(findUser.isPresent()) return true;
        return false;
    }



    @Override
    public String getGoogleImageUrl(String accessToken) {
        GoogleOAuthUserInfo googleOAuthUserInfo = parseGoogleJson(accessToken);

        if(googleOAuthUserInfo.getPicture() == null){

        }

        return googleOAuthUserInfo.getPicture();
    }

    /**
     *  Response 데이터 JSON -> Object 파싱
     */
    private GoogleOAuthUserInfo parseGoogleJson(String accessToken) {
        String response = parseGoogleToken(accessToken);

        // parse JSON - Null 처리 해야함.
        GoogleOAuthUserInfo googleOAuthUserInfo = null;
        try{
            googleOAuthUserInfo = new ObjectMapper().readValue(response, GoogleOAuthUserInfo.class);
            log.debug(googleOAuthUserInfo.toString());
        }catch (JsonProcessingException e) {
            log.error("Google Login Response Parse Error");
            throw new RuntimeException(e);
        }
        return googleOAuthUserInfo;
    }
}
