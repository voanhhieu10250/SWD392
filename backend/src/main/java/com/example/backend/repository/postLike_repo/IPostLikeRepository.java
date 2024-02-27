package com.example.backend.repository.postLike_repo;

import com.example.backend.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostLikeRepository extends JpaRepository<PostLike, Integer> {
}
