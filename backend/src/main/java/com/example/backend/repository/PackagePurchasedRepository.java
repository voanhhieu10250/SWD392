package com.example.backend.repository;

import com.example.backend.entity.PackagePurchased;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackagePurchasedRepository extends JpaRepository<PackagePurchased, Integer> {

    List<PackagePurchased> findAllByUserId(Integer userId);
}
