package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PokemonNotFoundInPokemonsState extends RuntimeException {
    public PokemonNotFoundInPokemonsState(Long attackId) {
        super(String.format("Attack with id %s not found in AttackState", attackId));
        log.error(this.getMessage());
    }
}
