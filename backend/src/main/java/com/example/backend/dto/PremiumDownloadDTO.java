package com.example.backend.dto;

import com.example.backend.entity.Art;
import com.example.backend.entity.User;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class PremiumDownloadDTO {

    private Integer id;

    private ArtDTO art;

    private UserDTO user;
}
