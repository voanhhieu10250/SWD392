package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(name = "userId")
    private Integer userId;

    @Column(name = "userName")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "isPremiumUser")
    private Boolean isPremiumUser;

    @Column(name = "isBanned")
    private Boolean isBanned;

    @Column(name = "walletId")
    private Integer walletId;

    @Column(name = "packageId")
    private Integer packageId;

    @Column(name = "role")
    private Integer role;
}
