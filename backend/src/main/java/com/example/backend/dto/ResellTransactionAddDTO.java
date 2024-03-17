package com.example.backend.dto;

import lombok.Data;

@Data
public class ResellTransactionAddDTO {

    private int artId;

    private int sellerUserId;

    private int buyerUserId;

    private long amount;

    private String message;
}
