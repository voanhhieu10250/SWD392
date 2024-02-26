package com.example.backend.dto;

import com.example.backend.entity.Category;
import com.example.backend.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class ArtDTO {

    private Integer id;

    private UserDTO owner;

    private String title;

    private String description;

    private List<CategoryDTO> artType;

    private String originUrl;

    private List<String> tags;

    private Boolean isPremium;

    private String watermarkedUrl;

    private Integer downloads;

    private Integer likes;

}
