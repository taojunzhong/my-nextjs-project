package com.example.common.dto;

import lombok.Data;

@Data
public class PrisonRequest {
    private Long id;
    private String name;
    private String prisonNumber;
    private String description;
    private String location;
    private String establishedDate;
    private Integer capacity;
    private Integer currentCount;
    private String securityLevel;
    private String wardenName;
    private String contactPhone;
    private String avatar;
    private Integer status;
}
