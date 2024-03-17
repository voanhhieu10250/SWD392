package com.example.backend.dto;

import com.example.backend.entity.ResellTransaction;
import com.example.backend.entity.enums.ResellStatus;
import lombok.Data;

import java.util.Date;

@Data
public class ResellMetadata {

    private Integer id;

    private String artTitle;
    private int artId;

    private String sellerUsername;
    private int sellerId;

    private String buyerUsername;
    private int buyerId;

    private Date date;

    private long amount;
    private ResellStatus status;
    private String message;

    public ResellMetadata(ResellTransaction resellTransaction) {
        this.id = resellTransaction.getId();
        this.artTitle = resellTransaction.getArt().getTitle();
        this.artId = resellTransaction.getArt().getId();
        this.sellerUsername = resellTransaction.getSellerUser().getUsername();
        this.sellerId = resellTransaction.getSellerUser().getId();
        this.buyerUsername = resellTransaction.getBuyerUser().getUsername();
        this.buyerId = resellTransaction.getBuyerUser().getId();
        this.date = resellTransaction.getDate();
        this.amount = resellTransaction.getAmount();
        this.status = resellTransaction.getStatus();
        this.message = resellTransaction.getMessage();
    }
}
