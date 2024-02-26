package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.util.Date;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class ResellTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Art art;

    @ManyToOne
    private User seller;

    @ManyToOne
    private User buyer;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Date date;

    private double transactionFee;

    private long amount;
}
