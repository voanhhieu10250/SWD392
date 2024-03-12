package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ResellTransactionDTO {

    private Integer id;

    private ArtDTO art;

    private UserDTO seller;

    private UserDTO buyer;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date date;

    private double transactionFee;

    private long amount;
}
