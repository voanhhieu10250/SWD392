package com.example.backend.common.exceptionHandler;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.jwt.JwtAuthorizationFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.NoResultException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandler {
    // log, slf4j

    final
    JwtAuthorizationFilter jwtAuthorizationFilter;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    public RestExceptionHandler(JwtAuthorizationFilter jwtAuthorizationFilter) {
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    }

    @ExceptionHandler({NoResultException.class, EmptyResultDataAccessException.class})
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ResponseDTO<Void> noResult(Exception ex) {
//		logger.error("NoResultException or EmptyResultDataAccessException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.NOT_FOUND).msg("Not Found").build();
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ResponseDTO<Void> accessDeny(Exception ex) {
//		logger.error("AccessDeniedException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.FORBIDDEN).msg("Deny").build();
    }

    @ExceptionHandler({ExpiredJwtException.class, MalformedJwtException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> unauthorized(Exception ex) {
//		logger.error("ExpiredJwtException or MalformedJwtException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.UNAUTHORIZED).msg("JWT Expired").build();
    }


    @ExceptionHandler({BadCredentialsException.class})
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseDTO<Void> badCredential(Exception ex) {
//		logger.error("BadCredentialsException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.UNAUTHORIZED).msg("Thông tin đăng nhập không chính xác!").build();
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    @ResponseStatus(code = HttpStatus.CONFLICT)
    public ResponseDTO<Void> conflict(Exception ex) {
        logger.error("DataIntegrityViolationException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.CONFLICT).msg("CONFLICT").build();
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseDTO<Void> badInput(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();

        String msg = errors.stream()
                .map(e -> ((FieldError) e).getField() + ":" + e.getDefaultMessage())
                .collect(Collectors.joining(";"));

//		logger.error("MethodArgumentNotValidException: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.BAD_REQUEST).msg(msg).build();
    }


    @ExceptionHandler({Exception.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseDTO<Void> generalException(Exception ex) {
        logger.error("Exception: ", ex);
        return ResponseDTO.<Void>builder().status(HttpStatus.INTERNAL_SERVER_ERROR).msg("SERVER ERROR").build();
    }

}
