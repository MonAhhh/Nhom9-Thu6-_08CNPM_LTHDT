package com.web.dto;

import com.web.entity.Authority;
import com.web.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String phone;

    private Integer actived;

    private String address;

    private String avatar;

    private Set<Authority> authorities;

    private Timestamp created_date;

    public UserDto(User user){
        this.actived = user.getActived();
        this.authorities = user.getAuthorities();
        this.id = user.getId();
        this.email = user.getEmail();
        this.username = user.getUsername();
    }
}

