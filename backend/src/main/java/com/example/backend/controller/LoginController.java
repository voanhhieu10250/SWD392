package com.example.backend.controller;

import com.example.backend.utils.exceptions.PasswordNotMatchException;
import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.entity.Staff;
import com.example.backend.entity.User;
import com.example.backend.jwt.JwtTokenService;
import com.example.backend.service.AuthService;
import com.example.backend.service.StaffService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@AllArgsConstructor
public class LoginController {
    private final UserService userService;
    private final StaffService staffService;
    private final AuthService authService;
    private final JwtTokenService jwtTokenService;

    @PostMapping("login")
    public ResponseDTO<JwtTokenService.TokenAndUser> userLogin(
            @RequestBody @Valid LoginDTO loginDTO) {
        try {
            User user = userService.getUserByEmail(loginDTO.getEmail());
            authService.authenticate(user.getPassword(), loginDTO.getPassword());
            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.OK)
                    .data(jwtTokenService.generateToken(user))
                    .build();
        } catch (PasswordNotMatchException e) {
            return ResponseDTO.<JwtTokenService.TokenAndUser>builder()
                    .status(HttpStatus.OK)
                    .msg("Mật khẩu không đúng")
                    .build();
        }
    }

    @PostMapping("super-login")
    public ResponseDTO<JwtTokenService.TokenAndStaff> superUserLogin(
            @RequestBody @Valid LoginDTO loginDTO) {
        try {
            Staff staff = staffService.getStaffByEmail(loginDTO.getEmail());
            authService.authenticate(staff.getPassword(), loginDTO.getPassword());

            return ResponseDTO.<JwtTokenService.TokenAndStaff>builder()
                    .status(HttpStatus.OK)
                    .data(jwtTokenService.generateToken(staff))
                    .build();
        } catch (PasswordNotMatchException e) {
            return ResponseDTO.<JwtTokenService.TokenAndStaff>builder()
                    .status(HttpStatus.OK)
                    .msg("Mật khẩu không đúng")
                    .build();
        }
    }
}
