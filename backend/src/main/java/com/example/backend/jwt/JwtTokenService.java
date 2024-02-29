package com.example.backend.jwt;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JwtTokenService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Value("${jwt.secret:123}")
    private String secretKey;

    private long validity = 5;

    public TokenAndUser createToken(String email){
        Claims claims = Jwts.claims().setSubject(email);
        Date now = new Date();
        Date exp = new Date(now.getTime() + validity * 60 * 1000);

        String token = Jwts.builder().setClaims(claims).setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        User user = userRepository.findByEmail(email);
        convert(user);

        return new TokenAndUser(token, convert(user));
    }

    private UserDTO convert(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public boolean inValidToken(String token){
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            //ko lam gi
        }
        return false;
    }

    @Data
    public static class TokenAndUser {
        private final String accessToken;
        private final UserDTO user;

        public TokenAndUser(String accessToken, UserDTO user) {
            this.accessToken = accessToken;
            this.user = user;
        }
    }

    public String getUsername(String token){
        try{
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                    .getBody().getSubject();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }




}
