package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryDTO {

    private Integer id;

    private String name;

    private String image;

    private MultipartFile imageFile;

}
