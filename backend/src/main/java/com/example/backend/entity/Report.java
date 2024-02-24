package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "report")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @Column(name = "reportId")
    private Integer reportId;

    @Column(name = "reporterUserId")
    private Integer reporterUserId;

    @Column(name = "reportedUserId")
    private Integer reportedUserId;

    @Column(name = "artId")
    private Integer artId;

    @Column(name = "reportDate")
    private LocalDateTime reportDate;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status;

    @Column(name = "resolverStaffId")
    private Integer resolverStaffId;
}
