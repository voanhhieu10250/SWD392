package com.example.backend.entity;

import com.example.backend.entity.enums.PreOrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Preorder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User creator;

    @ManyToOne
    private User customer;

    private String message;

    @Enumerated(EnumType.STRING)
    private PreOrderStatus status;

    private Float price;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Date date;
}
