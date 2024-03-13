package com.example.backend.repository;

import com.example.backend.entity.ResellTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResellTransactionRepository extends JpaRepository<ResellTransaction, Integer> {
}
