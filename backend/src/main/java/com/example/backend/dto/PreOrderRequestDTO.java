package com.example.backend.dto;

import com.example.backend.entity.Preorder;
import com.example.backend.entity.enums.PreOrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PreOrderRequestDTO {
    private Integer id;

    private String creatorName;

    private String message;

    private PreOrderStatus status;

    private Float price;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date date;

    public PreOrderRequestDTO(Preorder preorder) {
        this.id = preorder.getId();
        this.creatorName = preorder.getCreator().getUsername();
        this.message = preorder.getMessage();
        this.status = preorder.getStatus();
        this.price = preorder.getPrice();
        this.date = preorder.getDate();
    }
}
