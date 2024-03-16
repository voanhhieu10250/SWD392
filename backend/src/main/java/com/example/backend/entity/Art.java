package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Art {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User owner;

    private String title;

    private String description;

    @ManyToMany
    @JoinTable(
            name = "art_categories",
            joinColumns = @JoinColumn(name = "art_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    private String originUrl;

    private String tags;

    @OneToMany(mappedBy = "art")
    private List<Comment> comments;

    private Boolean isPremium;

    private String watermarkedUrl;

    private Integer downloads;

    private Integer likes;

    private boolean status;
}
