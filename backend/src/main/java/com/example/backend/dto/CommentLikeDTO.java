package com.example.backend.dto;

import lombok.Data;

@Data
public class CommentLikeDTO {

    private Integer id;

    private UserDTO user;

    private CommentDTO comment;
}
