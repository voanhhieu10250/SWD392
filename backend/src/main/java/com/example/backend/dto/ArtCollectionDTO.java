package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArtCollectionDTO {
    private Integer artCollectionId;
    private Integer collectionId;
    private Integer artId;
}
