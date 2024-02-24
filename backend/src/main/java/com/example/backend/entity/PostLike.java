package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_like")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostLike {
    @Id
    @Column(name = "postLikeId")
    private Integer postLikeId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "artId")
    private Integer artId;
}
