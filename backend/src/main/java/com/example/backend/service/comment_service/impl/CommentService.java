package com.example.backend.service.comment_service.impl;

import com.example.backend.repository.comment_repo.ICommentRepository;
import com.example.backend.service.comment_service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final ICommentRepository iCommentRepository;
}
