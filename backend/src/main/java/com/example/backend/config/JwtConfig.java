package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String privateKey;

    @Bean
    public SecretKey jwtSecretKey() {
        // Parse the shared secret from the configuration
        byte[] decodedKey = Base64.getDecoder().decode(privateKey);
        return new SecretKeySpec(decodedKey, "HmacSHA256");
    }
}
