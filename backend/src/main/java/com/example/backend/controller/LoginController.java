package com.example.backend.controller;

import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.jwt.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController 
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseDTO<JwtTokenService.TokenAndUser> login(
            @RequestBody @Valid LoginDTO loginDTO)  {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        List<String> authorities = authentication.getAuthorities().stream()
                .map(e -> e.getAuthority()).collect(Collectors.toList());

        return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                .status(200)
                .data(jwtTokenService.createToken(loginDTO.getEmail()))
                .build();
    }
}
