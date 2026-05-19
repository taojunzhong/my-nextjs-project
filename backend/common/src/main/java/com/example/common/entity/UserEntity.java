package com.example.common.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserEntity extends BaseEntity {
    private String username;
    private String email;
    private String password;
    private String nickname;
    private String avatar;
    private Integer status;
    private LocalDateTime lastLoginTime;
}
