package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class StaffDTO {

    private Integer id;

    private String userName;

    private String email;

    private String password;

    private Boolean isBanned;

    private Boolean isAdmin;

    @ManyToMany
    @JoinTable(
            name = "staff_permissions",
            joinColumns = @JoinColumn(name = "staff_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<PermissionDTO> permissions;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
