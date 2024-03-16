package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class User extends TimeAuditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String userName;

    private String password;

    private String email;

    private String avatar;

    private String bannerImg;

    private String backgroundColor;

    private String about;

    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        if (password != null) {
            this.password = PASSWORD_ENCODER.encode(password);
        }
    }
}
