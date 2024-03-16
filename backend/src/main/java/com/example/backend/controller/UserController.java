package com.example.backend.controller;


import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.jwt.JwtTokenService;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.S3StorageService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    S3StorageService s3StorageService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseDTO<JwtTokenService.TokenAndUser> createUser(@ModelAttribute @Valid UserDTO userDTO) throws IOException {

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

        User user = userService.createUser(userDTO);

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(200)
                .data(jwtTokenService.generateToken(user))
                .build();
    }


    @GetMapping("/")
    public ResponseDTO<List<UserDTO>> getAll() {
        return ResponseDTO.<List<UserDTO>>builder()
                .status(200)
                .data(userService.getAllUser())
                .build();
    }

    @GetMapping("/my-account")
    public ResponseDTO<UserDTO> getMyAccount(@RequestHeader("Authorization") String token) {
        String email = jwtTokenService.getTokenClaims(token.replace("Bearer ", "")).getSubject();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseDTO.<UserDTO>builder()
                    .status(HttpStatus.NOT_FOUND)
                    .msg("User not found")
                    .data(null)
                    .build();
        }

        UserDTO userDTO = convert(user.get());

        return ResponseDTO.<UserDTO>builder()
                .status(HttpStatus.OK)
                .data(userDTO)
                .build();
    }


    private UserDTO convert(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    @GetMapping("/{id}")
    public ResponseDTO<UserDTO> getUser(@PathVariable int id) {
        return ResponseDTO.<UserDTO>builder()
                .status(200)
                .data(userService.getUser(id))
                .build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> updateUser(@ModelAttribute @Valid UserDTO userDTO) throws IOException {

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
                .status(200)
                .msg("ok")
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseDTO.<Void>builder()
                .status(200)
                .msg("ok")
                .build();
    }
}
