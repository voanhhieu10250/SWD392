package com.example.backend.service.postLike_service.impl;

import com.example.backend.repository.postLike_repo.IPostLikeRepository;
import com.example.backend.service.postLike_service.IPostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostLikeService implements IPostLikeService {
    private final IPostLikeRepository iPostLikeRepository;
}
