package com.example.backend.dto;

import com.example.backend.entity.Art;
import lombok.Data;

@Data
public class ArtMetadata {
    private Integer id;

    private String title;

    private String description;

    private String originUrl;

    private Boolean isPremium;

    private String watermarkedUrl;

    private Integer downloads;

    private Integer likes;

    public ArtMetadata(Art art) {
        this.id = art.getId();
        this.title = art.getTitle();
        this.description = art.getDescription();
        this.originUrl = art.getOriginUrl();
        this.isPremium = art.getIsPremium();
        this.watermarkedUrl = art.getWatermarkedUrl();
        this.downloads = art.getDownloads();
        this.likes = art.getLikes();
    }
}
