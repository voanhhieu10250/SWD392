package com.example.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
public class ErrorMessage {
    private int statusCode;
    private String message;
    private String description;
    private Date timestamp;
    private String data;
}
