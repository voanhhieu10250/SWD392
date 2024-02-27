package com.example.backend.service.art_service.impl;

import com.example.backend.repository.art_repo.IArtRepository;
import com.example.backend.service.art_service.IArtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtService implements IArtService {
    private final IArtRepository iArtRepository;
}
