package com.example.backend.controller;


import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.CategoryService;
import com.example.backend.service.S3StorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    S3StorageService s3StorageService;

    @PostMapping("/")
    public ResponseDTO<Void> create(@ModelAttribute @Valid CategoryDTO categoryDTO) throws IOException {

        if (categoryDTO.getArtFile() != null && !categoryDTO.getArtFile().isEmpty()) {

            String filename = categoryDTO.getArtFile().getOriginalFilename();
            // Lấy định dạng của tệp
            String extension = filename.substring(filename.lastIndexOf("."));
            // Tạo tên mới
            String newFileName = UUID.randomUUID().toString() + extension;

            String photoURL = s3StorageService.uploadFile(newFileName, categoryDTO.getArtFile());

            categoryDTO.setImage(photoURL);
        }

        categoryService.create(categoryDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).msg("ok").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<CategoryDTO> get(@PathVariable("id") int id) {
        CategoryDTO categoryDTO = categoryService.getById(id);
        return ResponseDTO.<CategoryDTO>builder().status(HttpStatus.OK).data(categoryDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        categoryService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@ModelAttribute @Valid CategoryDTO categoryDTO) throws IOException {

        if (categoryDTO.getArtFile() != null && !categoryDTO.getArtFile().isEmpty()) {

            String filename = categoryDTO.getArtFile().getOriginalFilename();
            // Lấy định dạng của tệp
            String extension = filename.substring(filename.lastIndexOf("."));
            // Tạo tên mới
            String newFileName = UUID.randomUUID().toString() + extension;

            String photoURL = s3StorageService.uploadFile(newFileName, categoryDTO.getArtFile());

            categoryDTO.setImage(photoURL);
        }
        categoryService.update(categoryDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<CategoryDTO>> getAll() {
        return ResponseDTO.<List<CategoryDTO>>builder()
                .status(HttpStatus.OK)
                .data(categoryService.getAll())
                .build();
    }
}
