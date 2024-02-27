package com.example.backend.service.commentLike_service.impl;

import com.example.backend.repository.commentLike_repo.ICommentLikeRepository;
import com.example.backend.service.commentLike_service.ICommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentLikeService implements ICommentLikeService {
    private final ICommentLikeRepository iCommentLikeRepository;
}
