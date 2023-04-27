package com.ssafy.dubenguser.service;

import com.ssafy.dubenguser.dto.UserCalenderRes;
import com.ssafy.dubenguser.dto.UserCategoryRes;
import com.ssafy.dubenguser.dto.UserJoinReq;
import com.ssafy.dubenguser.dto.UserProfileRes;
import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.exception.NotFoundException;
import com.ssafy.dubenguser.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;


    /**
     *
     */
    public void save(UserJoinReq requestDTO){

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

    public boolean isExistNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);

        if (user.isPresent()){  // 이미 닉네임 존재
            return true;
        }

        return false;
    }

    @Transactional
    public UserProfileRes getProfile(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            throw new NotFoundException("존재하지 않는 유저입니다!");
        }

        List<UserCategoryRes> categories = userRepository.findCategoriesByUserId(user.get().getId());
        UserProfileRes result = UserProfileRes.builder()
                .totalRecTime(user.get().getTotalRecTime())
                .recordCount(user.get().getRecordCount())
                .category(categories)
                .build();

        return result;
    }

    public UserCalenderRes getCalender(Long userId) {
        ZonedDateTime today = ZonedDateTime.now();
        ZonedDateTime startDate = today.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        ZonedDateTime endDate = today.withDayOfMonth(today.getMonth().maxLength()).withHour(23).withMinute(59).withSecond(59).withNano(999_999_999);

        UserCalenderRes result = userRepository.findCalenderByUserId(userId, startDate, endDate);

        return result;
    }


}
