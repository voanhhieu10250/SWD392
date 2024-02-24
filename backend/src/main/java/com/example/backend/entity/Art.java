package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "art")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Art {
    @Id
    @Column(name = "artId")
    private Integer artId;

    @Column(name = "owerId")
    private Integer owerId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "artType")
    private Integer artType;

    @Column(name = "originUrl")
    private String originUrl;

    @Column(name = "tags")
    private String tags;

    @Column(name = "isPremium")
    private Boolean isPremium;

    @Column(name = "watermarkedUrl")
    private String watermarkedUrl;

    @Column(name = "downloads")
    private Integer downloads;

    @Column(name = "likes")
    private Integer likes;
}
