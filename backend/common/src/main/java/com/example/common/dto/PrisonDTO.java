package com.example.common.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PrisonDTO {
    private Long id;
    private String name;
    private String prisonNumber;
    private String description;
    private String location;
    private LocalDateTime establishedDate;
    private Integer capacity;
    private Integer currentCount;
    private String securityLevel;
    private String wardenName;
    private String contactPhone;
    private String avatar;
    private Integer status;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
