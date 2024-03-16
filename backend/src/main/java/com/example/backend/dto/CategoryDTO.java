package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CategoryDTO {

    private Integer id;

    private String name;

    private String image;

    private List<ArtDTO> arts;

    private MultipartFile artFile;
}
