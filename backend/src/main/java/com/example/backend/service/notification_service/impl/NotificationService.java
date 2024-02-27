package com.example.backend.service.notification_service.impl;

import com.example.backend.repository.notification_repo.INotificationRepository;
import com.example.backend.service.notification_service.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {
    private final INotificationRepository iNotificationRepository;
}
