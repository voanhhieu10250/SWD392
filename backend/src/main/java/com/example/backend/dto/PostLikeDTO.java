package com.example.backend.dto;

import lombok.Data;

@Data
public class PostLikeDTO {

    private Integer id;

    private UserDTO user;

    private ArtDTO art;
}
