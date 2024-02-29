package com.example.backend.service.art_service;

import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.Art_Comment_CommentLike_Category_DTO;
import com.example.backend.entity.Art;

import java.util.List;

public interface IArtService {

    //Get All Arts, Comment, Comment Like, Category
    List<Art_Comment_CommentLike_Category_DTO> getAllArts();

    //Get All Arts, Comment, Comment Like, Category with pagination
    List<Art_Comment_CommentLike_Category_DTO> getAllArtsWithPagination(int page, int size);

    //Get All Arts
    List<ArtDTO> getAllArtworks();

    //Delete Art
//    boolean deleteArt(int artId);
}
