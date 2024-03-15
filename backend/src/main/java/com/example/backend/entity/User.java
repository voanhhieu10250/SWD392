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

    private Boolean isPremiumUser;

    private Boolean isBanned;

    private String avatarImg;

    private String favouriteArt;

    private String bannerImg;

    private String about;

    private String backgroundColor;

    private Integer role;

    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        if (password != null) {
            this.password = PASSWORD_ENCODER.encode(password);
        }
    }
}
