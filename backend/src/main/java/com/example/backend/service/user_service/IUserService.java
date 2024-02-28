package com.example.backend.service.user_service;

import com.example.backend.dto.user_dto.UserResponseDTO;

import java.util.List;

public interface IUserService {
    //Get All User
    List<UserResponseDTO> getAllUsers(Integer role);

    //Delete User By UserID
    boolean deleteUser(Integer userId);
}
