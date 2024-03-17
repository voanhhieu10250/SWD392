package com.example.backend.common.exceptionHandler;

import com.example.backend.dto.ResponseDTO;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;


//  the @ControllerAdvice annotation is used to define a global exception handler. The @ExceptionHandler annotation
//  within the class indicates that the handleSizeLimitExceeded method should be invoked when a
//  SizeLimitExceededException is thrown.
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseDTO<String> handleSizeLimitExceeded(SizeLimitExceededException ex) {
        // Handle the exception and return an appropriate response
        return ResponseDTO.<String>builder()
                .status(HttpStatus.PAYLOAD_TOO_LARGE)
                .msg(ex.getMessage())
                .build();
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseDTO<String> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException ex) {
        // Handle the exception and return an appropriate response
        return ResponseDTO.<String>builder()
                .status(HttpStatus.PAYLOAD_TOO_LARGE)
                .msg(ex.getMessage())
                .build();
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseDTO<String> handleMissingServletRequestParameter(MissingServletRequestParameterException ex) {
        // Handle the exception and return an appropriate response
        return ResponseDTO.<String>builder()
                .status(HttpStatus.BAD_REQUEST)
                .msg(ex.getMessage())
                .build();
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseDTO<String> handleAccountDisabled(DisabledException ex) {
        // Handle the exception and return an appropriate response
        return ResponseDTO.<String>builder()
                .status(HttpStatus.FORBIDDEN)
                .msg(ex.getMessage())
                .build();
    }
}
