package com.example.backend.controller;


import com.example.backend.dto.ArtDTO;
import com.example.backend.dto.ArtMetadata;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.ArtService;
import com.example.backend.service.S3StorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("arts")
public class ArtController {

    @Autowired
    ArtService artService;

    @Autowired
    S3StorageService s3StorageService;

    @PostMapping("/")
    public ResponseDTO<Integer> create(@ModelAttribute @Valid ArtDTO artDTO) throws IllegalStateException, IOException, S3Exception {
        if (artDTO.getArtFile() != null && !artDTO.getArtFile().isEmpty()) {
            // Get the original file name
            String originalFilename = artDTO.getArtFile().getOriginalFilename();
            // Extract the file extension
            String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
            // Generate a new file name for the original file
            String newFileNameForOriginal = UUID.randomUUID().toString() + extension;
            // Generate a new file name for the watermarked file
            String newFileNameForWatermarked = UUID.randomUUID().toString() + extension;

            // Upload the original file to S3 and set the URL to originUrl
            String originalFileURL = s3StorageService.uploadFile(newFileNameForOriginal, artDTO.getArtFile());
            artDTO.setOriginUrl(originalFileURL);

            // Upload the watermarked file to S3 and set the URL to watermarkedUrl
            String watermarkedFileURL = s3StorageService.uploadFileWaterMark(newFileNameForWatermarked, artDTO.getArtFile());
            artDTO.setWatermarkedUrl(watermarkedFileURL);
        }

        // Proceed with the creation process in your service layer
        int artId = artService.create(artDTO);
        return ResponseDTO.<Integer>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .data(artId)
                .build();
    }


    @GetMapping("/{id}")
    public ResponseDTO<ArtDTO> getById(@PathVariable int id) {
        return ResponseDTO.<ArtDTO>builder()
                .status(HttpStatus.OK)
                .data(artService.getById(id))
                .build();
    }


    @GetMapping("/")
    public ResponseDTO<List<ArtDTO>> getAll() {
        return ResponseDTO.<List<ArtDTO>>builder()
                .status(HttpStatus.OK)
                .data(artService.getAll())
                .build();
    }


    @PutMapping("/")
    public ResponseDTO<Void> update(@ModelAttribute @Valid ArtDTO artDTO) throws IllegalStateException, IOException, S3Exception {
        if (artDTO.getArtFile() != null && !artDTO.getArtFile().isEmpty()) {
            // Get the original file name
            String originalFilename = artDTO.getArtFile().getOriginalFilename();
            // Extract the file extension
            String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
            // Generate a new file name for the original file
            String newFileNameForOriginal = UUID.randomUUID().toString() + extension;
            // Generate a new file name for the watermarked file
            String newFileNameForWatermarked = UUID.randomUUID().toString() + extension;

            // Upload the original file to S3 and set the URL to originUrl
            String originalFileURL = s3StorageService.uploadFile(newFileNameForOriginal, artDTO.getArtFile());
            artDTO.setOriginUrl(originalFileURL);

            // Upload the watermarked file to S3 and set the URL to watermarkedUrl
            String watermarkedFileURL = s3StorageService.uploadFileWaterMark(newFileNameForWatermarked, artDTO.getArtFile());
            artDTO.setWatermarkedUrl(watermarkedFileURL);
        }

        // Assuming you have a method in your service to update the Art
        // You may need to pass both the id and artDTO to perform the update correctly
        artService.update(artDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .build();
    }


    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable int id) {
        artService.delete(id);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .build();
    }

    @GetMapping("search")
    public ResponseDTO<Page<ArtMetadata>> search(@RequestParam String query, @RequestParam String searchBy, @RequestParam int page) {
        return ResponseDTO.<Page<ArtMetadata>>builder()
                .status(HttpStatus.OK)
                .data(artService.search(query, searchBy, page))
                .build();
    }

    @GetMapping("recent")
    public ResponseDTO<Page<ArtMetadata>> recentArts(@RequestParam int page) {
        return ResponseDTO.<Page<ArtMetadata>>builder()
                .status(HttpStatus.OK)
                .data(artService.getRecent(page))
                .build();
    }

    @GetMapping("top-week")
    public ResponseDTO<List<ArtMetadata>> topWeekArts() {
        return ResponseDTO.<List<ArtMetadata>>builder()
                .status(HttpStatus.OK)
                .data(artService.getTopWeek())
                .build();
    }

    @GetMapping("user/{id}")
    public ResponseDTO<Page<ArtMetadata>> getArtsByUser(@PathVariable int id, @RequestParam int page) {
        return ResponseDTO.<Page<ArtMetadata>>builder()
                .status(HttpStatus.OK)
                .data(artService.getArtsByUserId(id, page))
                .build();
    }
}
