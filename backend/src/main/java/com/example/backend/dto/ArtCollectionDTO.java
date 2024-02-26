package com.example.backend.dto;

import com.example.backend.entity.Art;
import com.example.backend.entity.Collection;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ArtCollectionDTO {

    private Integer id;

    private CollectionDTO collection;

    private ArtDTO art;
}
