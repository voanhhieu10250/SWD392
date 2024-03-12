package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDTO<T> {

    private int status;
    private String msg;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

}
