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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    S3StorageService s3StorageService;

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
                .data(jwtTokenService.createToken(user.getEmail()))
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
    public ResponseDTO<Map<String, UserDTO>> getMyAccount(@RequestHeader("Authorization") String token) {
        String email = jwtTokenService.getUsername(token.replace("Bearer ", ""));
        UserDTO user = convert(userRepository.findByEmail(email));
        Map<String, UserDTO> userData = new HashMap<>();
        userData.put("user", user);
        return ResponseDTO.<Map<String, UserDTO>>builder()
                .status(200)
                .data(userData)
                .build();
    }


    private  UserDTO convert(User user) {
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
