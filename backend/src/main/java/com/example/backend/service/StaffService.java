package com.example.backend.service;

import com.example.backend.dto.StaffDTO;
import com.example.backend.entity.Staff;
import com.example.backend.repository.StaffRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public interface StaffService {

    Staff createStaff(StaffDTO dto);

    Staff getStaff(int id);

    void updateStaff(StaffDTO dto);

    void deleteStaff(int id);

    List<StaffDTO> getAllStaff();

    Staff getStaffByEmail(String email);
}

@Service
class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Staff createStaff(StaffDTO dto) {
        return null;
    }

    @Override
    public Staff getStaff(int id) {
        return null;
    }

    @Override
    public void updateStaff(StaffDTO dto) {

    }

    @Override
    public void deleteStaff(int id) {

    }

    @Override
    public List<StaffDTO> getAllStaff() {
        return null;
    }

    @Override
    public Staff getStaffByEmail(String email) {
        return staffRepository.findByEmail(email).orElseThrow((NoResultException::new));
    }
}