package com.example.backend.repository;

import com.example.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStaffRepository extends JpaRepository<Staff, Integer> {
    List<Staff> findByIsAdmin(boolean isAdmin);
}
