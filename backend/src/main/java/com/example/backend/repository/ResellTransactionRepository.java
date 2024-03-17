package com.example.backend.repository;

import com.example.backend.entity.ResellTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResellTransactionRepository extends JpaRepository<ResellTransaction, Integer> {
    List<ResellTransaction> findByArt_IdOrderByDateDesc(int id);

    ResellTransaction findFirstByArt_IdOrderByDateDesc(int id);
}
