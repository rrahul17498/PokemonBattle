package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

public record UserActionDTO(
        String roomId,
        String type,
        Long source,
        String payload
) {
}
