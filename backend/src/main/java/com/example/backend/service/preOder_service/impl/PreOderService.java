package com.example.backend.service.preOder_service.impl;

import com.example.backend.repository.preOder_repo.IPreOderRepository;
import com.example.backend.service.preOder_service.IPreOderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreOderService implements IPreOderService {
    private final IPreOderRepository iPreOderRepository;
}
