package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @Column(name = "commentId")
    private Integer commentId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "artId")
    private Integer artId;

    @Column(name = "content")
    private String content;

    @Column(name = "commentDate")
    private LocalDateTime commentDate;

}
