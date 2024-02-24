package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "premium_download")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PremiumDownload {
    @Id
    @Column(name = "premiumDownloadId")
    private Integer premiumDownloadId;

    @Column(name = "artId")
    private Integer artId;

    @Column(name = "userId")
    private Integer userId;
}
