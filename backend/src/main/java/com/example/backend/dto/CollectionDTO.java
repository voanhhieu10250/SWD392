package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CollectionDTO {

    private Integer id;

    private UserDTO user;

    private String title;

    private String description;

    private Boolean isPrivate;

    private String featuredImageUrl;

    private MultipartFile featuredImageFile;
}
