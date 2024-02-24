package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Integer userId;
    private String userName;
    private String password;
    private String email;
    private Boolean isPremiumUser;
    private Boolean isBanned;
    private Integer walletId;
    private Integer packageId;
    private Integer role;
}
