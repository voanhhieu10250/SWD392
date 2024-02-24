package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArtDTO {
    private Integer artId;
    private Integer owerId;
    private String title;
    private String description;
    private Integer artType;
    private String originUrl;
    private String tags;
    private Boolean isPremium;
    private String watermarkedUrl;
    private Integer downloads;
    private Integer likes;
}
