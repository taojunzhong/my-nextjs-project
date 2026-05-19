package com.example.service.repository;

import com.example.common.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {
    private final ConcurrentHashMap<Long, UserEntity> userStore = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, UserEntity> usernameIndex = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, UserEntity> emailIndex = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public UserEntity findByUsername(String username) {
        return usernameIndex.get(username);
    }

    public UserEntity findByEmail(String email) {
        return emailIndex.get(email);
    }

    public UserEntity findById(Long id) {
        return userStore.get(id);
    }

    public UserEntity save(UserEntity user) {
        if (user.getId() == null) {
            user.setId(idGenerator.incrementAndGet());
            user.setCreateTime(LocalDateTime.now());
            user.setUpdateTime(LocalDateTime.now());
            user.setDeleted(0);
        } else {
            user.setUpdateTime(LocalDateTime.now());
        }
        userStore.put(user.getId(), user);
        usernameIndex.put(user.getUsername(), user);
        emailIndex.put(user.getEmail(), user);
        return user;
    }

    public List<UserEntity> findAll() {
        return new ArrayList<>(userStore.values());
    }

    public void deleteById(Long id) {
        UserEntity user = userStore.remove(id);
        if (user != null) {
            usernameIndex.remove(user.getUsername());
            emailIndex.remove(user.getEmail());
        }
    }

    public boolean existsByUsername(String username) {
        return usernameIndex.containsKey(username);
    }

    public boolean existsByEmail(String email) {
        return emailIndex.containsKey(email);
    }
}
