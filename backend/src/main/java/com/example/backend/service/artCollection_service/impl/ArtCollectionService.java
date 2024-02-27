package com.example.backend.service.artCollection_service.impl;

import com.example.backend.repository.artCollection_repo.IArtCollectionRepository;
import com.example.backend.service.artCollection_service.IArtCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtCollectionService implements IArtCollectionService {
    private final IArtCollectionRepository iArtCollectionRepository;
}
