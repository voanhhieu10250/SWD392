package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class PermissionDTO {

    private Integer id;

    private String resourceType;

    private String action;

    private Boolean isAllowed;

    @ManyToMany(mappedBy = "permissions")
    private Set<StaffDTO> staffs;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
