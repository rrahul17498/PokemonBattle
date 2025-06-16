package com.pokemonbattle.pokemonbattlebackend.restApi;

import com.pokemonbattle.pokemonbattlebackend.pokemon.exceptions.PokemonNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
public class GlobalRestAPIExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleRuntimeException (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GlobalRestAPIErrorResponse("An unexpected error occurred."));
    };

    @ExceptionHandler(PokemonNotFoundException.class)
    public ResponseEntity<GlobalRestAPIErrorResponse> handlePokemonNotFoundException (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GlobalRestAPIErrorResponse(
                e.getMessage()
        ));
    };

}
