package com.example.backend.controller.user_controller;

import com.example.backend.dto.user_dto.UserResponseDTO;
import com.example.backend.service.user_service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final IUserService iUserService;

    //Get All Users By Role : 0 => user, 1 => creator
    @GetMapping("/getAllUserByRole")
    public ResponseEntity<List<UserResponseDTO>> getAllUserByRole(@RequestParam(defaultValue = "0") Integer role){
        if (role < 0 || role > 1){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(iUserService.getAllUsers(role));
    }

    //Delete User By UserID
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<Void> deleteUserByUserID(@PathVariable Integer userId){
        boolean deleted = iUserService.deleteUser(userId);
        if (deleted){
            return ResponseEntity.noContent().build(); //Delete User Successfully
        } else {
            return ResponseEntity.notFound().build(); //Not Found User
        }
    }
}
