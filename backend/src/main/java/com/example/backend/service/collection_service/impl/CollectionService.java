package com.example.backend.service.collection_service.impl;

import com.example.backend.mapper.collection_mapper.ICollectionMapper;
import com.example.backend.repository.collection_repo.ICollectionRepository;
import com.example.backend.service.collection_service.ICollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollectionService implements ICollectionService {
    private final ICollectionRepository iCollectionRepository;
}
