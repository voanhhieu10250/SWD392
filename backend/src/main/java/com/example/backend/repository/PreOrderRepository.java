package com.example.backend.repository;

import com.example.backend.entity.Preorder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface PreOrderRepository extends JpaRepository<Preorder, Integer> {

    List<Preorder> findAllByCreatorIdOrderByIdDesc(Integer creatorId);

    List<Preorder> findAllByCustomerIdOrderByIdDesc(Integer customerId);
}
