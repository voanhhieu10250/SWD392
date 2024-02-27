package com.example.backend.service.user_service.impl;

import com.example.backend.repository.user_repo.IUserRepository;
import com.example.backend.service.user_service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository iUserRepository;
}
