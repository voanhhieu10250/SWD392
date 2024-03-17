package com.example.backend.entity;

import com.example.backend.entity.utils.TimeAuditable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class User extends TimeAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private String password;

    private String email;

    private String avatar;

    private String bannerImg;

    private String backgroundColor;

    private String about;

    private Boolean isBanned = false;

    private Boolean isPremiumAudience = false;

    private Boolean isCreator = false;

    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        if (password != null) {
            this.password = PASSWORD_ENCODER.encode(password);
        }
    }
}
