package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ResponseDTO<T> {
    private HttpStatus status;
    private String msg;
    private T data;
}
