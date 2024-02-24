package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collection")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collection {
    @Id
    @Column(name = "collectionId")
    private Integer collectionId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "isPrivate")
    private Boolean isPrivate;

    @Column(name = "featuredImageUrl")
    private String featuredImageUrl;

}
