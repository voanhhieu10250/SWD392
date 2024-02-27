package com.example.backend.service.premiumDownload_service.impl;

import com.example.backend.repository.premiumDownload_repo.IPremiumDownloadRepository;
import com.example.backend.service.premiumDownload_service.IPremiumDownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PremiumDownloadService implements IPremiumDownloadService {
    private final IPremiumDownloadRepository iPremiumDownloadRepository;
}
