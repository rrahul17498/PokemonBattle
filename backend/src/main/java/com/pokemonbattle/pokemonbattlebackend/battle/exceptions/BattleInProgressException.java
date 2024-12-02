package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BattleInProgressException extends RuntimeException {
    public BattleInProgressException(Integer battleId) {
        super(String.format("Battle with id %s is in progress", battleId));
        log.error(this.getMessage());
    }
}
