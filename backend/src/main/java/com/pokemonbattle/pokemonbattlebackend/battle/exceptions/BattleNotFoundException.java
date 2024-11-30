package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleAccessFromTypes;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BattleNotFoundException extends RuntimeException {
    public BattleNotFoundException(BattleAccessFromTypes accessType, Number id) {
        super(String.format("Battle not found for %s with id %s", accessType.getType(), id.toString()));
        log.error(this.getMessage());
    }

    public BattleNotFoundException(BattleAccessFromTypes accessType, String id) {
        super(String.format("Battle not found for %s with id %s", accessType.getType(), id));
        log.error(this.getMessage());
    }
}
