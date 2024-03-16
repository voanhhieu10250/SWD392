package com.example.backend.jwt;

import com.example.backend.dto.StaffDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.Staff;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.Getter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenService {
    private static final Logger logger = LoggerFactory.getLogger(Jwts.class);
    private final Long jwtExpiration = 7200000L; // 2 hours

    @Autowired
    UserRepository userRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private SecretKey jwtSecretKey;

    @Getter
    private final String authHeader = "Authorization";

    @Getter
    private final String tokenPrefix = "Bearer ";

    public TokenAndUser generateToken(User user) {
        Date now = new Date();
        Map<String, Boolean> claims = new HashMap<>();
        claims.put("isSuperUser", false);

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtExpiration))
                .signWith(jwtSecretKey)
                .compact();

        convert(user);

        return new TokenAndUser(token, convert(user));
    }

    public TokenAndStaff generateToken(Staff staff) {
        Date now = new Date();
        Map<String, Boolean> claims = new HashMap<>();
        claims.put("isSuperUser", true);

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(staff.getEmail())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtExpiration))
                .signWith(jwtSecretKey)
                .compact();

        return new TokenAndStaff(token, modelMapper.map(staff, StaffDTO.class));
    }

    private UserDTO convert(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public boolean isValidToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e1) {
            logger.error("invalid JWT Signature: {} \n token: {}", e1.getMessage(), token);
        } catch (ExpiredJwtException e2) {
            logger.error("JWT token is expired: {} \n token: {}", e2.getMessage(), token);
        } catch (MalformedJwtException e3) {
            logger.error("invalid JWT token: {} \n token: {}", e3.getMessage(), token);
        } catch (IllegalArgumentException e4) {
            logger.error("JWT claims String is empty: {} \n token: {}", e4.getMessage(), token);
        } catch (UnsupportedJwtException e5) {
            logger.error("JWT Token is not support: {} \n token: {}", e5.getMessage(), token);
        }
        return false;
    }

    public String getJwtTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader(authHeader);

        if (StringUtils.hasText(header) && header.startsWith(tokenPrefix))
            return header.substring(tokenPrefix.length());

        return null;
    }

    public Claims getTokenClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            logger.error("Error get email from token: {}", e.getMessage());
        }
        return null;
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

    @Data
    public static class TokenAndStaff {
        private final String accessToken;
        private final StaffDTO staff;

        public TokenAndStaff(String accessToken, StaffDTO staff) {
            this.accessToken = accessToken;
            this.staff = staff;
        }
    }
}
