package com.example.backend.entity;

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

    private String status;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Date date;
}
