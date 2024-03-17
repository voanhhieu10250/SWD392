package com.example.backend.jwt;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.entity.Staff;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.Role;
import com.example.backend.service.StaffService;
import com.example.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenService jwtTokensService;

    @Autowired
    UserService userService;

    @Autowired
    StaffService staffService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokensService.getJwtTokenFromRequest(request);

        if (token == null || !jwtTokensService.isValidToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        Claims claims = jwtTokensService.getTokenClaims(token);
        Set<GrantedAuthority> authorities = new HashSet<>();

        // If the user is a super user, then the user is an admin or a staff
        if (claims.get("isSuperUser", Boolean.class)) {
            Staff staff = staffService.getStaffByEmail(claims.getSubject());

            if (staff.getIsAdmin()) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.ADMIN));
            } else {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.STAFF));
            }

            Authentication auth = new UsernamePasswordAuthenticationToken(staff, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
            filterChain.doFilter(request, response);
            return;
        }

        // If the user is not a super user, then the user is an audience or a creator
        User user = userService.getUserByEmail(jwtTokensService.getTokenClaims(token).getSubject());

        // If the user is banned, then return 403
        if (user.getIsBanned()) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(response.getWriter(),
                    ResponseDTO.builder().status(HttpStatus.FORBIDDEN).msg("Tài khoản đã bị khóa").build());
            return;
        }

        if (user.getIsCreator()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.CREATOR));
        } else if (user.getIsPremiumAudience()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.PREMIUM_AUDIENCE));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.NORMAL_AUDIENCE));
        }

        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}
