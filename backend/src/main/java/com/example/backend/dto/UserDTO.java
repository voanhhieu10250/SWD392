package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class UserDTO {

    private Integer id;

    private String userName;

    private String password;

    private String email;

    private Boolean isPremiumUser;

    private Boolean isBanned;

    private String avatarImg;

    private String favouriteArt;

    private String bannerImg;

    private String about;

    private String backgroundColor;

    private Integer role;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    @JsonIgnore
    private MultipartFile file;
}
