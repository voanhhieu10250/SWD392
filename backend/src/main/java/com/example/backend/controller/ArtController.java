package com.example.backend.controller;


import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.PageDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.SearchDTO;
import com.example.backend.service.ArtService;
import com.example.backend.service.S3StorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/art")
public class ArtController {

    @Autowired
     ArtService artService;

    @Autowired
    S3StorageService s3StorageService;

    @PostMapping("/")
    public ResponseDTO<Void> create(@ModelAttribute @Valid ArtDTO artDTO) throws IllegalStateException, IOException, S3Exception {


        if (artDTO.getArtFile() != null && !artDTO.getArtFile().isEmpty()) {

            String filename = artDTO.getArtFile().getOriginalFilename();
            // get fomat file
            String extension = filename.substring(filename.lastIndexOf("."));
            // create new name
            String newFileName = UUID.randomUUID().toString() + extension;

            // Use the uploadFileWaterMark method instead of uploadFile
            String photoURL = s3StorageService.uploadFileWaterMark(newFileName, artDTO.getArtFile());

            artDTO.setOriginUrl(photoURL);
        }

        artService.create(artDTO);
        return ResponseDTO.<Void>builder()
                .status(200)
                .msg("ok")
                .build();
    }


    @GetMapping("/{id}")
    public ResponseDTO<ArtDTO> getById(@PathVariable int id) {
        return ResponseDTO.<ArtDTO>builder()
                .status(200)
                .data(artService.getById(id))
                .build();
    }



    @GetMapping("/")
    public ResponseDTO<List<ArtDTO>> getAll() {
        return ResponseDTO.<List<ArtDTO>>builder()
                .status(200)
                .data(artService.getAll())
                .build();
    }



    @PutMapping("/{id}")
    public ResponseDTO<Void> update(@PathVariable long id, @ModelAttribute @Valid ArtDTO artDTO) throws IllegalStateException, IOException, S3Exception {

        if (artDTO.getArtFile() != null && !artDTO.getArtFile().isEmpty()) {
            String filename = artDTO.getArtFile().getOriginalFilename();
            // lay dinh dang file
            String extension = filename.substring(filename.lastIndexOf("."));
            // tao ten moi
            String newFilename = UUID.randomUUID().toString() + extension;

            String photoURL = s3StorageService.uploadFile(newFilename, artDTO.getArtFile());

            artDTO.setOriginUrl(photoURL);// save to db
        }
        artService.update(artDTO);
        return ResponseDTO.<Void>builder()
                .status(200)
                .msg("ok")
                .build();
    }


    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable int id) {
        artService.delete(id);
        return ResponseDTO.<Void>builder()
                .status(200)
                .msg("ok")
                .build();
    }

    @PostMapping("/search")
    public ResponseDTO<PageDTO<ArtDTO>> search(@RequestBody @Valid SearchDTO searchDTO) {
        return ResponseDTO.<PageDTO<ArtDTO>>builder()
                .status(200)
                .data(artService.search(searchDTO))
                .build();
    }
}
