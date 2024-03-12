package com.example.backend.repository;

import com.example.backend.entity.Preorder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPreOderRepository extends JpaRepository<Preorder, Integer> {
}
