package com.example.backend.service.staff_service.impl;

import com.example.backend.dto.StaffResponseDTO;
import com.example.backend.entity.Staff;
import com.example.backend.mapper.IStaffMapper;
import com.example.backend.repository.IStaffRepository;
import com.example.backend.service.staff_service.IStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService implements IStaffService {
    private final IStaffRepository iStaffRepository;
    private final IStaffMapper iStaffMapper;

    //Get All Staffs
    public List<StaffResponseDTO> getAllStaffs(){
        List<Staff> staffs = iStaffRepository.findByIsAdmin(false);
        return iStaffMapper.staffEntityListToStaffResponseDTOList(staffs);
    }
}
