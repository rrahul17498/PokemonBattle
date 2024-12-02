package com.pokemonbattle.pokemonbattlebackend.pokemon.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PokemonNotFoundException extends RuntimeException {
    public PokemonNotFoundException(Long id) {
        super(String.format("Pokemon with id %s not found", id));
        log.error(this.getMessage());
    }
}
