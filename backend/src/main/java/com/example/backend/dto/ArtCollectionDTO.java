package com.example.backend.dto;

import lombok.Data;

@Data
public class ArtCollectionDTO {

    private Integer id;

    private CollectionDTO collection;

    private ArtDTO art;
}
