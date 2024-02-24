package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "package")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Package {
    @Id
    @Column(name = "packageId")
    private Integer packageId;

    @Column(name = "packageName")
    private String packageName;

    @Column(name = "desciption")
    private String desciption;

    @Column(name = "maxUploads")
    private String maxUploads;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "createDate")
    private LocalDateTime createDate;
}
