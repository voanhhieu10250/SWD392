package com.example.backend.entity;

import com.example.backend.entity.utils.TimeAuditable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Staff extends TimeAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private String email;

    private String password;

    private Boolean isBanned;

    private Boolean isAdmin;

    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        if (password != null) {
            this.password = PASSWORD_ENCODER.encode(password);
        }
    }

}
