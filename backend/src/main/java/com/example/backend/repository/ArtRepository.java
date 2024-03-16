package com.example.backend.repository;

import com.example.backend.entity.Art;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArtRepository extends JpaRepository<Art, Integer> {

    @Query("SELECT a FROM Art a WHERE a.title LIKE :name")
    Page<Art> searchByName(@Param("name") String name, Pageable pageable);
}
