package com.example.backend.controller;


import com.example.backend.dto.PremiumDownloadDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.FollowShipService;
import com.example.backend.service.PremiumDownloadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/premium-download")
public class PremiumDownloadController {

    @Autowired
    PremiumDownloadService premiumDownloadService;


    @PostMapping("/")
    public ResponseDTO<Void> create(@RequestBody @Valid PremiumDownloadDTO premiumDownloadDTO) {
        premiumDownloadService.create(premiumDownloadDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).msg("200").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<PremiumDownloadDTO> get(@PathVariable("id") int id) {
        PremiumDownloadDTO premiumDownloadDTO = premiumDownloadService.getById(id);
        return ResponseDTO.<PremiumDownloadDTO>builder().status(HttpStatus.OK).data(premiumDownloadDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        premiumDownloadService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid PremiumDownloadDTO premiumDownloadDTO) {
        premiumDownloadService.update(premiumDownloadDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<PremiumDownloadDTO>> getAll() {
        return ResponseDTO.<List<PremiumDownloadDTO>>builder()
                .status(HttpStatus.OK)
                .data(premiumDownloadService.getAll())
                .build();
    }
}
