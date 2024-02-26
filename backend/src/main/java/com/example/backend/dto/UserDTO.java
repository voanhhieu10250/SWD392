package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {

    private Integer id;

    private String userName;

    private String password;

    private String email;

    private Boolean isPremiumUser;

    private Boolean isBanned;

    private WalletDTO wallet;

    private PackageDTO aPackage;

    private Integer role;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
