package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @Column(name = "notificationId")
    private Integer notificationId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "senderId")
    private Integer senderId;

    @Column(name = "messageType")
    private String messageType;

    @Column(name = "message")
    private String message;

    @Column(name = "isRead")
    private Boolean isRead;

    @Column(name = "createDate")
    private LocalDateTime createDate;
}
