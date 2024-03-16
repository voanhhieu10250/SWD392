package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ArtDTO {

    private Integer id;

    private User owner;

    private String title;

    private String description;

    private List<CategoryDTO> categories;

    private String originUrl;

    private String tags;

    private List<CommentDTO> comments;

    private Boolean isPremium;

    private String watermarkedUrl;

    private Integer downloads;

    private Integer likes;

    private boolean status;

    private MultipartFile artFile;
}
