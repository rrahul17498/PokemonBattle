package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AttackNotFoundInAttackResources extends RuntimeException {
    public AttackNotFoundInAttackResources(Long attackId) {
        super(String.format("Attack with id %s not found in AttackResources", attackId));
        log.error(this.getMessage());
    }
}
