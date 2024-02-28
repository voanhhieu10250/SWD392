package com.example.backend.dto.staff_dto;

import com.example.backend.dto.PermissionDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class StaffResponseDTO {
    private Integer id;

    private String userName;

    private String email;

    private Boolean isBanned;

    private Boolean isAdmin;

    private Set<PermissionDTO> permissions;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
