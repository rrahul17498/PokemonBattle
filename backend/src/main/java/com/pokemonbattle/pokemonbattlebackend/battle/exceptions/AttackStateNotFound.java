package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AttackStateNotFound extends RuntimeException {
  public AttackStateNotFound(String roomId) {
    super(String.format("AttackState not found for room with id %s", roomId));
    log.error(this.getMessage());
  }
}
