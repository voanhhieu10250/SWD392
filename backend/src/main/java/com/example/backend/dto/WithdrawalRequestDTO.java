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
public class WithdrawalRequestDTO {
    private Integer withDrawalRequestId;
    private Integer userId;
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdDate;
}
