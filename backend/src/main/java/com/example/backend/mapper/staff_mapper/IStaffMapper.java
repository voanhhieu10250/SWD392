package com.example.backend.mapper.staff_mapper;

import com.example.backend.dto.staff_dto.StaffResponseDTO;
import com.example.backend.entity.Staff;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface IStaffMapper {
    List<StaffResponseDTO> staffEntityListToStaffResponseDTOList(List<Staff> staffs);
}
