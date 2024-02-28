package com.example.backend.controller.staff_controller;

import com.example.backend.dto.staff_dto.StaffResponseDTO;
import com.example.backend.service.staff_service.IStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/staff")
@RequiredArgsConstructor
public class StaffController {
    private final IStaffService iStaffService;

    //Get All Staff
    @GetMapping("/getAllStaff")
    public ResponseEntity<List<StaffResponseDTO>> getAllStaffs(){
        return ResponseEntity.ok(iStaffService.getAllStaffs());
    }
}
