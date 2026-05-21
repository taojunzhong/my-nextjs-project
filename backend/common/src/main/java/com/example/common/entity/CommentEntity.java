package com.example.common.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ljm_comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prison_id", nullable = false)
    private Long prisonId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "deleted")
    private Integer deleted = 0;

    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        if (deleted == null) {
            deleted = 0;
        }
    }
}