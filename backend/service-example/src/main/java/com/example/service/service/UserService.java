package com.example.service.service;

import com.example.common.dto.LoginRequest;
import com.example.common.dto.LoginResponse;
import com.example.common.dto.RegisterRequest;
import com.example.common.dto.UserDTO;
import com.example.common.entity.UserEntity;
import com.example.common.response.Result;
import com.example.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Result<LoginResponse> login(LoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.getUsername()).orElse(null);
        
        if (user == null) {
            return Result.error(401, "用户名不存在");
        }

        if (user.getStatus() != null && user.getStatus() != 1) {
            return Result.error(401, "账号已被禁用");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return Result.error(401, "密码错误");
        }

        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);

        String token = generateToken(user.getId());
        UserDTO userDTO = convertToDTO(user);

        return Result.success(new LoginResponse(token, userDTO));
    }

    public Result<UserDTO> register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return Result.error(400, "用户名已存在");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return Result.error(400, "邮箱已被注册");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getUsername());
        user.setStatus(1);

        UserEntity savedUser = userRepository.save(user);
        UserDTO userDTO = convertToDTO(savedUser);

        return Result.success("注册成功", userDTO);
    }

    public Result<UserDTO> getUserById(Long id) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }
        return Result.success(convertToDTO(user));
    }

    private String generateToken(Long userId) {
        return "Bearer " + UUID.randomUUID().toString() + "-" + userId + "-" + System.currentTimeMillis();
    }

    private UserDTO convertToDTO(UserEntity user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname());
        dto.setAvatar(user.getAvatar());
        dto.setStatus(user.getStatus());
        return dto;
    }
}
