package com.example.backend.repository.premiumDownload_repo;

import com.example.backend.entity.PremiumDownload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPremiumDownloadRepository extends JpaRepository<PremiumDownload, Integer> {
}
