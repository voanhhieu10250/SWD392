package com.example.backend.repository.preOder_repo;

import com.example.backend.entity.Preorder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPreOderRepository extends JpaRepository<Preorder, Integer> {
}
