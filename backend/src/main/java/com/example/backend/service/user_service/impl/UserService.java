package com.example.backend.service.user_service.impl;

import com.example.backend.dto.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.IUserMapper;
import com.example.backend.repository.IUserRepository;
import com.example.backend.service.user_service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository iUserRepository;
    private final IUserMapper iUserMapper;

    //Get All Users
    @Override
    public List<UserResponseDTO> getAllUsers(Integer role) {
        List<User> users = iUserRepository.findByRole(role);
        return iUserMapper.userEntityListToUserResponseDTOList(users);
    }

    //Delete User By UserID
    @Override
    public boolean deleteUser(Integer userId) {
        Optional<User> userOptional = iUserRepository.findById(userId);
        if (userOptional.isPresent()){
            User user = userOptional.get();
            user.setIsBanned(true);
            iUserRepository.save(user);
            return true;
        } else {
            return false;
        }
    }
}
