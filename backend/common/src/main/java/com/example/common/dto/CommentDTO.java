package com.example.common.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO {
    private Long id;
    private Long prisonId;
    private Long userId;
    private String username;
    private String content;
    private LocalDateTime createTime;
}