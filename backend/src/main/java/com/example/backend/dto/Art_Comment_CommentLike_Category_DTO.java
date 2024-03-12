package com.example.backend.dto;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.CommentDTO;
import com.example.backend.dto.CommentLikeDTO;
import com.example.backend.dto.UserDTO;
import lombok.Data;

import java.util.List;

@Data
public class Art_Comment_CommentLike_Category_DTO {
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

    private boolean status;

    private List<CategoryDTO> categoryDTOList;

    private List<CommentDTO> commentDTOList;

    private  List<CommentLikeDTO> commentLikeDTOList;
}
