package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Data;

@Data
public class CollectionDTO {

    private Integer id;

    private User userId;

    private String title;

    private String description;

    private Boolean isPrivate;

    private String featuredImageUrl;
}
