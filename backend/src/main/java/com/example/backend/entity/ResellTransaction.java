package com.example.backend.entity;

import com.example.backend.entity.enums.ResellStatus;
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
    private User sellerUser;

    @ManyToOne
    private User buyerUser;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Date date;

    private double transactionFee;

    private long amount;
    private ResellStatus status;
    private String message;
}
