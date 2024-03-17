package com.example.backend.dto;

import com.example.backend.entity.Preorder;
import com.example.backend.entity.enums.PreOrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PreOrderOfferDTO {
    private Integer id;

    private String customerName;

    private String message;

    private PreOrderStatus status;

    private Float price;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date date;

    public PreOrderOfferDTO(Preorder preorder) {
        this.id = preorder.getId();
        this.customerName = preorder.getCustomer().getUsername();
        this.message = preorder.getMessage();
        this.status = preorder.getStatus();
        this.price = preorder.getPrice();
        this.date = preorder.getDate();
    }
}
