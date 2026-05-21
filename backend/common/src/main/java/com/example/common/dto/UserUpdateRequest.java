package com.example.common.dto;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String avatar;
    private String bio;
}