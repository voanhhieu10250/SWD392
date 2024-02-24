package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreorderDTO {
    private Integer preOrderId;
    private Integer creatorId;
    private Integer customerId;
    private String message;
    private String status;
    private LocalDateTime orderDate;
}
