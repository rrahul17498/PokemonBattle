package com.pokemonbattle.pokemonbattlebackend.battle.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BattleStateNotFoundForRoom extends RuntimeException {
  public BattleStateNotFoundForRoom(String roomId) {
    super(String.format("BattleState not found for room with id %s", roomId));
    log.error(this.getMessage());
  }
}
