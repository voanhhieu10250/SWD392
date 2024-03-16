package com.example.backend.entity;

import com.example.backend.entity.utils.TimeAuditable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Permission extends TimeAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String resourceType;

    private String action;

    private Boolean isAllowed;

    @ManyToMany(mappedBy = "permissions")
    private Set<Staff> staffs;

}
