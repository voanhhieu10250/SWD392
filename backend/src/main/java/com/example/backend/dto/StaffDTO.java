package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffDTO {
    private Integer staffId;
    private String userName;
    private String email;
    private String password;
    private Boolean isBanned;
    private Boolean isAdmin;
    private Integer permisstionId;
}
