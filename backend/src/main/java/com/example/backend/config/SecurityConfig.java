package com.example.backend.config;

import com.example.backend.common.exceptionHandler.AuthenticationEntryPointHandler;
import com.example.backend.common.exceptionHandler.CustomAccessDeniedHandler;
import com.example.backend.jwt.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final AuthenticationEntryPointHandler authenticationEntryPointHandler;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    private String allowedOrigins = "http://localhost:[*]";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        CorsConfiguration configuration = getCorsConfiguration();

        http.cors(corsCustomizer -> corsCustomizer.configurationSource(request -> configuration));
        http.csrf(AbstractHttpConfigurer::disable);
        http.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers(HttpMethod.GET, "/tutors/me", "/current-user", "/class-registrations/tutor", "/class-registrations/class-id/{classId}").hasRole(Role.TUTOR.toString())
//                .requestMatchers(HttpMethod.PUT, "/change-password").hasRole(Role.TUTOR.toString())
//                .requestMatchers(HttpMethod.PUT, "/tutors/{id}", "/class-registrations/{id}").authenticated()
//                .requestMatchers(HttpMethod.POST, "/class-registrations").authenticated()
//                .requestMatchers(HttpMethod.DELETE, "/tutors/{id}/image").authenticated()
//                .requestMatchers(HttpMethod.GET, "/tutors", "/tutors/metadata", "/tutors/{id}", "/classes/all", "/contacts", "/class-registrations", "/class-registrations/details/{id}", "/class-registrations/pending/{tutorId}", "/check-admin-token", "/posts/all").hasRole(Role.ADMIN.toString())
//                .requestMatchers(HttpMethod.POST, "/classes", "/areas", "/subjects", "/class-categories", "/posts", "/posts/category", "/posts/upload-file").hasRole(Role.ADMIN.toString())
//                .requestMatchers(HttpMethod.PUT, "/tutors/{id}/disabled", "/areas/*", "/subjects/*", "/class-categories/*", "/contacts/{id}/read", "/classes/*", "/classes/{id}/published", "/class-registrations/{id}/change-tutor/{tutorId}", "/posts/category/{id}", "/posts/{id}/publish", "/posts/{id}").hasRole(Role.ADMIN.toString())
//                .requestMatchers(HttpMethod.DELETE, "/tutors/{id}", "/areas/*", "/subjects/*", "/class-categories/*", "/contacts/*", "/classes/*", "/class-registrations/{id}", "/classes/{id}/tutor", "/posts/category/{id}", "/posts/upload-file", "/posts/upload-file/multiple", "/posts/{id}").hasRole(Role.ADMIN.toString())
                        .anyRequest().permitAll()
        ).exceptionHandling(exc -> exc
                // The AccessDeniedHandler invokes when a user tries to access a protected resource without proper
                // authentication (i.e., they are not logged in). Error code 401
                .authenticationEntryPoint(authenticationEntryPointHandler)
                // The AuthenticationEntryPoint invokes when a user attempts to access a resource for which they don't
                // have sufficient permissions (access is denied). Error code 403
                .accessDeniedHandler(customAccessDeniedHandler)
        );

        return http.build();
    }

    private CorsConfiguration getCorsConfiguration() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(allowedOrigins.split(",")));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        return configuration;
    }
}
