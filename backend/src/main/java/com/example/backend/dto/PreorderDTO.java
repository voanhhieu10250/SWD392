package com.example.backend.dto;

import com.example.backend.entity.enums.PreOrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PreorderDTO {

    private Integer id;

    private UserDTO creator;

    private UserDTO customer;

    private String message;

    private PreOrderStatus status;

    private Float price;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date date;
}
