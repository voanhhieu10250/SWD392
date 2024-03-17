package com.example.backend.repository;

import com.example.backend.entity.Art;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArtRepository extends JpaRepository<Art, Integer> {

    @Query("SELECT a FROM Art a WHERE a.title LIKE :name")
    Page<Art> searchByName(@Param("name") String name, Pageable pageable);

    @Query("SELECT a FROM Art a ORDER BY a.id ASC LIMIT 10")
    List<Art> findTopWeek();

    Page<Art> findAllByTagsContainsIgnoreCase(String query, Pageable pageable);

    Page<Art> findAllByTitleContainsIgnoreCase(String query, Pageable pageable);

    Page<Art> findAllByDescriptionContainsIgnoreCase(String query, Pageable pageable);

    Page<Art> findAllByOwnerId(int id, Pageable pageable);
}
