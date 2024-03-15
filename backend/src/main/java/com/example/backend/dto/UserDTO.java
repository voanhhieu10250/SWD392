package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class UserDTO {

    private Integer id;

    private String userName;

    private String password;

    private String email;

    private String avatar;

    private String bannerImg;

    private String backgroundColor;

    private String about;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    private MultipartFile avatarFile;

    private MultipartFile bannerImgFile;
}
