package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wallet {
    @Id
    @Column(name = "walletId")
    private Integer walletId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "totalErning")
    private BigDecimal totalErning;

    @Column(name = "withdrawnAmount")
    private BigDecimal withdrawnAmount;

    @Column(name = "lastUpdate")
    private LocalDateTime lastUpdate;
}
