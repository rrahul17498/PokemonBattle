package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ActivePokemonNotFoundException extends RuntimeException {
  public ActivePokemonNotFoundException(Long pokemonId) {
    super(String.format("Pokemon with id %s is not active", pokemonId));
    log.error(this.getMessage());
  }
}
