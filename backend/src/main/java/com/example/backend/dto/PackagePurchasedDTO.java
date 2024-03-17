package com.example.backend.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PackagePurchasedDTO {

    private Integer id;

    private double price;

    private String packageName;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date date;
}
