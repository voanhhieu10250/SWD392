package com.example.backend.service.permission_service.impl;

import com.example.backend.repository.permission_repo.IPermissionRepository;
import com.example.backend.service.permission_service.IPermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PermissionService implements IPermissionService {
    private final IPermissionRepository iPermissionRepository;
}
