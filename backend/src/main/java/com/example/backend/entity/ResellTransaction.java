package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "resell_transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResellTransaction {
    @Id
    @Column(name = "resellTransactionId")
    private Integer resellTransactionId;

    @Column(name = "artId")
    private Integer artId;

    @Column(name = "sellerUserId")
    private Integer sellerUserId;

    @Column(name = "buyerUserId")
    private Integer buyerUserId;

    @Column(name = "transactionDate")
    private LocalDateTime transactionDate;

    @Column(name = "transactionFee")
    private BigDecimal transactionFee;

    @Column(name = "amount")
    private BigDecimal amount;
}
