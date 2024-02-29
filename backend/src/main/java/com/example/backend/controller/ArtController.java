
//package com.example.backend.controller;
//
//import com.example.backend.dto.ArtDTO;
//import com.example.backend.dto.ResponseDTO;
//import com.example.backend.service.ArtService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("api/v1/arts")
//public class ArtController {
//
//    @Autowired
//    ArtService artService;
//
//    @GetMapping("/{id}")
//    ResponseDTO<ArtDTO> getById(@PathVariable int id) {
//        return  ResponseDTO.<ArtDTO>builder()
//                .status(200)
//                .data(artService.getById(id))
//                .build();
//    }
//
//    @DeleteMapping("/{id}")
//    ResponseDTO<Void> delete(@PathVariable int id) {
//        artService.delete(id);
//        return  ResponseDTO.<Void>builder()
//                .status(200)
//                .msg("ok")
//                .build();
//    }
//
//
//}

package com.example.backend.controller;

import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.Art_Comment_CommentLike_Category_DTO;
import com.example.backend.service.art_service.IArtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/art")
@RequiredArgsConstructor
public class ArtController {
    private final IArtService iArtService;

    // API Get All Arts, Comment, Comment Like, Category
    @GetMapping("/getAllArts")
    public ResponseEntity<List<Art_Comment_CommentLike_Category_DTO>> getAllArts(){
        return ResponseEntity.ok(iArtService.getAllArts());
    }

    //API Get All Arts, Comment, Comment Like, Category with pagination
    @GetMapping("/getAllArtsWithPagination") // /getAllArtsWithPagination?page={page}&size={size}
    public ResponseEntity<List<Art_Comment_CommentLike_Category_DTO>> getAllArtWithPagination(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(iArtService.getAllArtsWithPagination(page, size));
    }

    //API Get All Arts
    @GetMapping("/getAllArtworks")
    public ResponseEntity<List<ArtDTO>> getAllArtworks(){
        return ResponseEntity.ok(iArtService.getAllArtworks());
    }
}

