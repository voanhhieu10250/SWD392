package com.example.backend.mapper.user_mapper;

import com.example.backend.dto.user_dto.UserResponseDTO;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface IUserMapper {

    List<UserResponseDTO> userEntityListToUserResponseDTOList(List<User> users);
}
