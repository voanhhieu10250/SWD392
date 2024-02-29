package com.example.backend.repository;

import com.example.backend.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentLikeRepository extends JpaRepository<CommentLike, Integer> {
}
