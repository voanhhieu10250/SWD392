package com.example.backend.service.art_service.impl;

import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.Art_Comment_CommentLike_Category_DTO;
import com.example.backend.entity.Art;
import com.example.backend.mapper.IArtMapper;
import com.example.backend.repository.IArtRepository;
import com.example.backend.service.art_service.IArtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@EnableTransactionManagement
public class ArtService implements IArtService {
    private final IArtRepository iArtRepository;
    @Qualifier("IArtMapper")
    private final IArtMapper iArtMapper;

    //Get All Arts, Comment, Comment Like, Category
    @Override
    public List<Art_Comment_CommentLike_Category_DTO> getAllArts() {
        List<Art> arts = iArtRepository.findAll();
        return iArtMapper.artEntityListToArtDTOList(arts);
    }

    //Get All Arts, Comment, Comment Like, Category with pagination
    @Override
    public List<Art_Comment_CommentLike_Category_DTO> getAllArtsWithPagination(int page, int size) {
        //Get list arts with pagination from repository
        Pageable pageable = PageRequest.of(page, size);
        Page<Art> artPage = iArtRepository.findAll(pageable);
        return iArtMapper.artEntityListToArtDTOList(artPage.getContent());
    }

    //Get All Arts
    @Override
    public List<ArtDTO> getAllArtworks() {
        List<Art> arts = iArtRepository.findAll();
        return iArtMapper.listArtEntityToListArtDTO(arts);
    }

}
