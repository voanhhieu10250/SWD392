package com.example.backend.service.package_service.impl;

import com.example.backend.repository.package_repo.IPackageRepository;
import com.example.backend.service.package_service.IPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackageService implements IPackageService {
    private final IPackageRepository iPackageRepository;
}
