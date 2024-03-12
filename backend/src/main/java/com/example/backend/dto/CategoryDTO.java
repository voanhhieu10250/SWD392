package com.example.backend.dto;

import com.example.backend.entity.Art;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class CategoryDTO {

    private Integer id;

    private String name;

    private String description;

    private List<ArtDTO> arts;
}
