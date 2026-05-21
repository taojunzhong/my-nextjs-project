package com.example.common.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private Long prisonId;
    private String content;
}