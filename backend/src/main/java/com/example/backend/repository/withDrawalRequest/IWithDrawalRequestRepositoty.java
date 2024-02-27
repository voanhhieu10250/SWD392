package com.example.backend.repository.withDrawalRequest;

import com.example.backend.entity.WithdrawalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWithDrawalRequestRepositoty extends JpaRepository<WithdrawalRequest, Integer> {
}
