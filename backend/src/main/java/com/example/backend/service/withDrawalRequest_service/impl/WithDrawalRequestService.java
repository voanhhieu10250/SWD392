package com.example.backend.service.withDrawalRequest_service.impl;

import com.example.backend.repository.withDrawalRequest.IWithDrawalRequestRepositoty;
import com.example.backend.service.withDrawalRequest_service.IWithDrawalRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WithDrawalRequestService implements IWithDrawalRequestService {
    private final IWithDrawalRequestRepositoty iWithDrawalRequestRepositoty;
}
