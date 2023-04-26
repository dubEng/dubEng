package com.ssafy.dubenguser.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Value("${kakao.clientId}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.redirectUri}")
    private String REDIRECT_URI;

    public String getAccessToken(String code){

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
        HashMap<String, Object> result = getKakaoResponse(response);

        //Null 처리
        if(result.get("access_token") == null) throw new RuntimeException();
        String accessToken = (String) result.get("access_token");


        Long id = parseToken(accessToken);

        if(checkEnrolledMember(id)){
            //회원이 있다면
            return "/";
        }
        //회원이 없다면
        return "/join";
    }

    /**
     * accessToken을 받아
     * kakao Auth 서버에 parse 요청
     */
    public Long parseToken(String accessToken){
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
        HashMap<String, Object> result = getKakaoResponse(response);

        //Null 처리
        if(result.get("id") == null) throw new RuntimeException();
        Long id = (Long) result.get("id");
        log.debug("{}", id);

        return id;
    }
    /**
     *  DB로 부터 이미 등록된 회원인지 확인
     *  false : 등록된 회원이 없다.
     *  true : 등록된 회원이 있다.
     */
    private boolean checkEnrolledMember(Long id){

        Optional<User> member = userRepository.findById(id);

        // Null = 회원이 없다는 뜻.
        if(!member.isPresent()) return false;

        log.debug("회원 있어유~");
        return true;
    }
    /**
     * @Param response : kakao로 부터 받은 데이터
     * 파싱해서 Map 형태로 Return
     */
    private HashMap<String, Object> getKakaoResponse(String response) {
        log.debug(response.toString());
        HashMap<String, Object> result = null;
        try {
            result = new ObjectMapper().readValue(response, HashMap.class);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
