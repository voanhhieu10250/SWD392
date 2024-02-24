package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionDTO {
    private Integer permissionId;
    private Integer roleId;
    private String resourceType;
    private String action;
    private Boolean isAllowed;
    private LocalDateTime createdDate;
}
