package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "followship")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Followship {
    @Id
    @Column(name = "followShipId")
    private Integer followShipId;

    @Column(name = "followerUserId")
    private Integer followerUserId;

    @Column(name = "followingUserId")
    private Integer followingUserId;
}
