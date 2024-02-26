package com.example.backend.dto;

import com.example.backend.entity.Permission;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
public class StaffDTO {

    private Integer id;

    private String userName;

    private String email;

    private String password;

    private Boolean isBanned;

    private Boolean isAdmin;

    private Set<PermissionDTO> permissions;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
