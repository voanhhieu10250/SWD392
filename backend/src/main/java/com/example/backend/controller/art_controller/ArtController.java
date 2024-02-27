package com.example.backend.controller.art_controller;

import com.example.backend.service.art_service.IArtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/art")
@RequiredArgsConstructor
public class ArtController {
    private final IArtService iArtService;
}
