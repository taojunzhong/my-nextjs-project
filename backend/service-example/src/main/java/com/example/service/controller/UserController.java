package com.example.service.controller;

import com.example.common.dto.LoginRequest;
import com.example.common.dto.LoginResponse;
import com.example.common.dto.RegisterRequest;
import com.example.common.dto.UserDTO;
import com.example.common.response.Result;
import com.example.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result<LoginResponse> login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/register")
    public Result<UserDTO> register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @GetMapping("/user/{id}")
    public Result<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
