package com.example.backend.repository;

import com.example.backend.entity.Preorder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreOrderRepository extends JpaRepository<Preorder, Integer> {

}
