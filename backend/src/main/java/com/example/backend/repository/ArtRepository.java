package com.example.backend.repository;

import com.example.backend.entity.Art;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtRepository extends JpaRepository<Art, Integer> {
}
