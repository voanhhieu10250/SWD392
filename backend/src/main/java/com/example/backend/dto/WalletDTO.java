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
public class WalletDTO {
    private Integer walletId;
    private Integer userId;
    private BigDecimal balance;
    private BigDecimal totalErning;
    private BigDecimal withdrawnAmount;
    private LocalDateTime lastUpdate;
}
