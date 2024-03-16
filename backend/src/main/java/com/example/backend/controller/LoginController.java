package com.example.backend.controller;

import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.jwt.JwtTokenService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {


    @Autowired
    UserService userService;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("login")
    public ResponseDTO<JwtTokenService.TokenAndUser> userLogin(
            @RequestBody @Valid LoginDTO loginDTO) {

        User user = userService.getUserByEmail(loginDTO.getEmail());

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(HttpStatus.OK)
                .data(jwtTokenService.generateToken(user))
                .build();
    }

//    @PostMapping("super-login")
//    public ResponseDTO<JwtTokenService.TokenAndUser> superUserLogin(
//            @RequestBody @Valid LoginDTO loginDTO) {
//    }
}
