package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageDTO {
    private Integer packageId;
    private String packageName;
    private String desciption;
    private String maxUploads;
    private BigDecimal price;
    private Integer duration;
    private LocalDateTime createDate;
}
