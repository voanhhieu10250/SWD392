package com.example.backend.repository;

import com.example.backend.entity.ArtCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IArtCollectionRepository extends JpaRepository<ArtCollection, Integer> {
}