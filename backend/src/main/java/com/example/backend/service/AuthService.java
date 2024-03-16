package com.example.backend.service;

import com.example.backend.utils.exceptions.PasswordNotMatchException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

public interface AuthService {
    void authenticate(String encodedPassword, String password) throws PasswordNotMatchException;

    String encodePassword(String password);
}

@Service
@AllArgsConstructor
class AuthServiceImpl implements AuthService {
    private final PasswordEncoder encoder;

    @Override
    public void authenticate(String encodedPassword, String password) throws PasswordNotMatchException {
        if (encoder.matches(password, encodedPassword)) return;
        throw new PasswordNotMatchException();
    }

    @Override
    public String encodePassword(String password) {
        return encoder.encode(password);
    }
}
