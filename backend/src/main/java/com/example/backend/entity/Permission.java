package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "permission")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {
    @Id
    @Column(name = "permissionId")
    private Integer permissionId;

    @Column(name = "roleId")
    private Integer roleId;

    @Column(name = "resourceType")
    private String resourceType;

    @Column(name = "action")
    private String action;

    @Column(name = "isAllowed")
    private Boolean isAllowed;

    @Column(name = "createdDate")
    private LocalDateTime createdDate;
}
