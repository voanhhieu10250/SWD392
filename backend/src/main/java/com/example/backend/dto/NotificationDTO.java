package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Integer notificationId;
    private Integer userId;
    private Integer senderId;
    private String messageType;
    private String message;
    private Boolean isRead;
    private LocalDateTime createDate;
}
