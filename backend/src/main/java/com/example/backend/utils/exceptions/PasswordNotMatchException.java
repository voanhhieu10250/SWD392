package com.example.backend.utils.exceptions;

public class PasswordNotMatchException extends Exception {
    public PasswordNotMatchException() {
        super("Password not match");
    }

    public PasswordNotMatchException(String message) {
        super(message);
    }

    public PasswordNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }
}
