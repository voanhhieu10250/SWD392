package com.example.backend.service.staff_service;

import com.example.backend.dto.staff_dto.StaffResponseDTO;

import java.util.List;

public interface IStaffService {
    //Get All Staff
    List<StaffResponseDTO> getAllStaffs();
}
