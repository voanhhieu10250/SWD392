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
public class ResellTransactionDTO {
    private Integer resellTransactionId;
    private Integer artId;
    private Integer sellerUserId;
    private Integer buyerUserId;
    private LocalDateTime transactionDate;
    private BigDecimal transactionFee;
    private BigDecimal amount;
}
