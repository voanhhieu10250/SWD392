package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class StaffDTO {

    private Integer id;

    private String username;

    private String email;

    private String password;

    private Boolean isBanned;

    private Boolean isAdmin;

    private Set<PermissionDTO> permissions;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
