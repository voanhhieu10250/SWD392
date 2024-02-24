package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "preorder")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Preorder {
    @Id
    @Column(name = "preOrderId")
    private Integer preOrderId;

    @Column(name = "creatorId")
    private Integer creatorId;

    @Column(name = "customerId")
    private Integer customerId;

    @Column(name = "message")
    private String message;

    @Column(name = "status")
    private String status;

    @Column(name = "orderDate")
    private LocalDateTime orderDate;
}
