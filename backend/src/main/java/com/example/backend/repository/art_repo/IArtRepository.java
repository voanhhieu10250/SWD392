package com.example.backend.repository.art_repo;

import com.example.backend.entity.Art;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IArtRepository extends JpaRepository<Art, Integer> {
}
