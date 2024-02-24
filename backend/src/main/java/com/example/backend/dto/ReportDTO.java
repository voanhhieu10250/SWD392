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
public class ReportDTO {
    private Integer reportId;
    private Integer reporterUserId;
    private Integer reportedUserId;
    private Integer artId;
    private LocalDateTime reportDate;
    private String description;
    private String status;
    private Integer resolverStaffId;
}
