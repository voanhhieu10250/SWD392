package com.example.backend.service.wallet_service.impl;

import com.example.backend.repository.wallet_repo.IWalletRepository;
import com.example.backend.service.wallet_service.IWalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalletService implements IWalletService {
    private final IWalletRepository iWalletRepository;
}
