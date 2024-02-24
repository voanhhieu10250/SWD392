package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PremiumDownloadDTO {
    private Integer premiumDownloadId;
    private Integer artId;
    private Integer userId;
}
