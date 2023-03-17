package com.web.controller;
import com.web.entity.User;
import com.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HomeController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = {"/","/home"}, method = RequestMethod.GET)
    public String getHomePage() {
//        User u = new User();
//        u.setUsername("admin");
//        u.setPassword(passwordEncoder.encode("admin"));
//        u.setActived(1);
//        userRepository.save(u);
        return "index";
    }
}
