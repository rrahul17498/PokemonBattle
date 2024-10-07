package com.pokemonbattle.pokemonbattlebackend.pokemon;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PokemonNotFoundException extends RuntimeException {
    public PokemonNotFoundException() {
        super("Pokemon not found");
    }
}
