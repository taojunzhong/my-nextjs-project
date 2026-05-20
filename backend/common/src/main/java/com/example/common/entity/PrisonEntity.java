package com.example.common.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ljm_prison")
public class PrisonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "prison_number", unique = true, nullable = false, length = 50)
    private String prisonNumber;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "established_date")
    private LocalDateTime establishedDate;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "current_count")
    private Integer currentCount;

    @Column(name = "security_level", length = 50)
    private String securityLevel;

    @Column(name = "warden_name", length = 100)
    private String wardenName;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Column(name = "avatar", length = 500)
    private String avatar;

    @Column(name = "status", nullable = false)
    private Integer status = 1;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @Column(name = "deleted")
    private Integer deleted = 0;

    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        updateTime = LocalDateTime.now();
        if (deleted == null) {
            deleted = 0;
        }
        if (status == null) {
            status = 1;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
    }
}
