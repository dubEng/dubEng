package com.ssafy.dubenguser.calender;

import com.ssafy.dubenguser.entity.User;
import com.ssafy.dubenguser.entity.UserCalendar;
import com.ssafy.dubenguser.repository.UserCalenderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@SpringBootTest
@Transactional
public class CalenderTest {

    @Autowired
    private UserCalenderRepository userCalenderRepository;

    @Test
    @Rollback(value = false)
    void save(){
        // insert Test
        UserCalendar userCalendar = new UserCalendar();

        User user = new User();
        user.setId("2763952293");

        userCalendar.setUser(user);
        userCalendar.setMonth(5);

        userCalenderRepository.save(userCalendar);

    }
    @Test
    void findByUserIdAndMonth(){
        List<UserCalendar> list = userCalenderRepository.findByUserIdAndMonth("2763952293", 5);

        for (UserCalendar userCalendar : list) {
            System.out.println(userCalendar.toString());
        }
    }
}
