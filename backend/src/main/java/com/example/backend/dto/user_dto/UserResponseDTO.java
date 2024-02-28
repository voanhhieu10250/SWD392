package com.example.backend.dto.user_dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class UserResponseDTO {
    private Integer id;

    private String userName;

    private String email;

    private Boolean isPremiumUser;

    private Boolean isBanned;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    private Integer role;
}
