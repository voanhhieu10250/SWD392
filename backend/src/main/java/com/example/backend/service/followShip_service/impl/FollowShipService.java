package com.example.backend.service.followShip_service.impl;

import com.example.backend.repository.followship_repo.IFollowShipRepository;
import com.example.backend.service.followShip_service.IFollowShipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowShipService implements IFollowShipService {
    private final IFollowShipRepository iFollowShipRepository;
}
