package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {
    @Id
    @Column(name = "staffId")
    private Integer staffId;

    @Column(name = "userName")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "isBanned")
    private Boolean isBanned;

    @Column(name = "isAdmin")
    private Boolean isAdmin;

    @Column(name = "permisstionId")
    private Integer permisstionId;
}
