package com.example.backend.dto;

import com.example.backend.entity.enums.PreOrderStatus;
import lombok.Data;

@Data
public class PreOrderUpdateDTO {
    private Integer id;

    private UserDTO creator;

    private UserDTO customer;

    private String message;

    private String reply;

    private PreOrderStatus status;
}
