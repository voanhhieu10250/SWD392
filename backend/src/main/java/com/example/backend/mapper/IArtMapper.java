package com.example.backend.mapper;


import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.Art_Comment_CommentLike_Category_DTO;
import com.example.backend.entity.Art;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface IArtMapper {
    List<Art_Comment_CommentLike_Category_DTO> artEntityListToArtDTOList(List<Art> art);

    List<ArtDTO> listArtEntityToListArtDTO(List<Art> arts);
}
