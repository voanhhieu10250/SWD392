package com.example.backend.service.resellTransaction_service.impl;

import com.example.backend.repository.resellTransaction_repo.IResellTransactionRepository;
import com.example.backend.service.resellTransaction_service.IResellTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResellTransactionService implements IResellTransactionService {
    private final IResellTransactionRepository iResellTransactionRepository;
}
