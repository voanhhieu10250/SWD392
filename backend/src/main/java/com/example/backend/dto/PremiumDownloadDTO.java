package com.example.backend.dto;

import lombok.Data;

@Data
public class PremiumDownloadDTO {

    private Integer id;

    private ArtDTO art;

    private UserDTO user;
}
