package com.example.backend.service.staff_service.impl;

import com.example.backend.repository.staff_reppo.IStaffRepository;
import com.example.backend.service.staff_service.IStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StaffService implements IStaffService {
    private final IStaffRepository iStaffRepository;
}
