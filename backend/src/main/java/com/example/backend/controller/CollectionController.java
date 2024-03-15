package com.example.backend.controller;


import com.example.backend.dto.CollectionDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.CollectionService;
import com.example.backend.service.S3StorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    @Autowired
    CollectionService collectionService;

    @Autowired
    S3StorageService s3StorageService;

    @PostMapping("/")
    public ResponseDTO<Void> create(@ModelAttribute @Valid CollectionDTO collectionDTO) throws IOException {

        if (collectionDTO.getFeaturedImageFile() != null && !collectionDTO.getFeaturedImageFile().isEmpty()) {

            String filename = collectionDTO.getFeaturedImageFile().getOriginalFilename();
            // Lấy định dạng của tệp
            String extension = filename.substring(filename.lastIndexOf("."));
            // Tạo tên mới
            String newFileName = UUID.randomUUID().toString() + extension;

            String photoURL = s3StorageService.uploadFile(newFileName, collectionDTO.getFeaturedImageFile());

            collectionDTO.setFeaturedImageUrl(photoURL);
        }

        collectionService.create(collectionDTO);
        return ResponseDTO.<Void>builder().status(200).msg("ok").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<CollectionDTO> get(@PathVariable("id") int id) {
        CollectionDTO CollectionDTO = collectionService.getById(id);
        return ResponseDTO.<CollectionDTO>builder().status(200).data(CollectionDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        collectionService.delete(id);
        return ResponseDTO.<Void>builder().status(200).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@ModelAttribute @Valid CollectionDTO collectionDTO) throws IOException {

        if (collectionDTO.getFeaturedImageFile() != null && !collectionDTO.getFeaturedImageFile().isEmpty()) {

            String filename = collectionDTO.getFeaturedImageFile().getOriginalFilename();
            // Lấy định dạng của tệp
            String extension = filename.substring(filename.lastIndexOf("."));
            // Tạo tên mới
            String newFileName = UUID.randomUUID().toString() + extension;

            String photoURL = s3StorageService.uploadFile(newFileName, collectionDTO.getFeaturedImageFile());

            collectionDTO.setFeaturedImageUrl(photoURL);
        }
        collectionService.update(collectionDTO);
        return ResponseDTO.<Void>builder().status(200).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<CollectionDTO>> getAll() {
        return ResponseDTO.<List<CollectionDTO>>builder()
                .status(200)
                .data(collectionService.getAll())
                .build();
    }
}
