package com.example.backend.controller;


import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.jwt.JwtTokenService;
import com.example.backend.service.S3StorageService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FileValidator;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserService userService;
    @Autowired
    S3StorageService s3StorageService;

    @PostMapping("register")
    public ResponseDTO<JwtTokenService.TokenAndUser> register(@ModelAttribute @Valid UserDTO userDTO) throws IOException {
        if (userService.getUserByEmail(userDTO.getEmail()) != null) {
            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .msg("Email already exists")
                    .build();
        }

        if (FileValidator.isValidImageFile(userDTO.getAvatarFile())) {
            String avatarFilename = userDTO.getAvatarFile().getOriginalFilename();
            String avatarExtension = avatarFilename.substring(avatarFilename.lastIndexOf("."));
            String newAvatarFileName = UUID.randomUUID().toString() + avatarExtension;

            String avatarURL = s3StorageService.uploadFile(newAvatarFileName, userDTO.getAvatarFile());

            userDTO.setAvatar(avatarURL);
        }

        if (FileValidator.isValidImageFile(userDTO.getBannerImgFile())) {
            String bannerFilename = userDTO.getBannerImgFile().getOriginalFilename();
            String bannerExtension = bannerFilename.substring(bannerFilename.lastIndexOf("."));
            String newBannerFileName = UUID.randomUUID().toString() + bannerExtension;

            String bannerURL = s3StorageService.uploadFile(newBannerFileName, userDTO.getBannerImgFile());

            userDTO.setBannerImg(bannerURL);
        }

        userDTO.setIsBanned(false);
        userDTO.setIsCreator(false);
        userDTO.setIsPremiumAudience(false);

        User user = userService.createUser(userDTO);

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(HttpStatus.CREATED)
                .data(jwtTokenService.generateToken(user))
                .build();
    }


    @GetMapping
    public ResponseDTO<List<UserDTO>> getAll() {
        return ResponseDTO.<List<UserDTO>>builder()
                .status(HttpStatus.OK)
                .data(userService.getAllUser())
                .build();
    }

    @GetMapping("my-account")
    public ResponseDTO<UserDTO> getMyAccount(@RequestHeader("Authorization") String token) {
        String email = jwtTokenService.getTokenClaims(token.replace("Bearer ", "")).getSubject();
        User user = userService.getUserByEmail(email);

        UserDTO userDTO = convert(user);

        return ResponseDTO.<UserDTO>builder()
                .status(HttpStatus.OK)
                .data(userDTO)
                .build();
    }


    private UserDTO convert(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    @GetMapping("{id}")
    public ResponseDTO<UserDTO> getUser(@PathVariable int id) {
        return ResponseDTO.<UserDTO>builder()
                .status(HttpStatus.OK)
                .data(userService.getUser(id))
                .build();
    }

    @PutMapping
    public ResponseDTO<Void> updateUser(@ModelAttribute @Valid UserDTO userDTO) throws IOException {
        userService.getUserByEmail(userDTO.getEmail());

        if (userDTO.getAvatarFile() != null && !userDTO.getAvatarFile().isEmpty()) {
            String avatarFilename = userDTO.getAvatarFile().getOriginalFilename();
            String avatarExtension = avatarFilename.substring(avatarFilename.lastIndexOf("."));
            String newAvatarFileName = UUID.randomUUID().toString() + avatarExtension;

            String avatarURL = s3StorageService.uploadFile(newAvatarFileName, userDTO.getAvatarFile());

            userDTO.setAvatar(avatarURL);
        }

        if (userDTO.getBannerImgFile() != null && !userDTO.getBannerImgFile().isEmpty()) {
            String bannerFilename = userDTO.getBannerImgFile().getOriginalFilename();
            String bannerExtension = bannerFilename.substring(bannerFilename.lastIndexOf("."));
            String newBannerFileName = UUID.randomUUID().toString() + bannerExtension;

            String bannerURL = s3StorageService.uploadFile(newBannerFileName, userDTO.getBannerImgFile());

            userDTO.setBannerImg(bannerURL);
        }
        userService.updateUser(userDTO);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .build();
    }

    @DeleteMapping("{id}")
    public ResponseDTO<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .build();
    }
}
