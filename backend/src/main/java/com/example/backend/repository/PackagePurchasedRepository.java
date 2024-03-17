package com.example.backend.repository;

import com.example.backend.entity.PackagePurchased;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackagePurchasedRepository extends JpaRepository<PackagePurchased, Integer> {

}
