package com.example.backend.repository;

import com.example.backend.entity.Followship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFollowShipRepository extends JpaRepository<Followship, Integer> {
}
