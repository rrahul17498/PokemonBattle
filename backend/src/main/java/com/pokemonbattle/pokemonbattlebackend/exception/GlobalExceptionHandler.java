package com.pokemonbattle.pokemonbattlebackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFoundException (ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                e.getMessage()
        ));
    };

    @ExceptionHandler(ResourceInUseException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceInUseException(ResourceInUseException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiErrorResponse(
                HttpStatus.CONFLICT.value(),
                e.getMessage()
        ));
    }
}
