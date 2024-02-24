package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "art_collection")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArtCollection {
    @Id
    @Column(name = "artCollectionId")
    private Integer artCollectionId;

    @Column(name = "collectionId")
    private Integer collectionId;

    @Column(name = "artId")
    private Integer artId;

}
