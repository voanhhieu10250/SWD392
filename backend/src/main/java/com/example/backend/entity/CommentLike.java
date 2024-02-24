package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment_like")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentLike {
    @Id
    @Column(name = "commentLikeId")
    private Integer commentLikeId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "commentId")
    private Integer commentId;
}
