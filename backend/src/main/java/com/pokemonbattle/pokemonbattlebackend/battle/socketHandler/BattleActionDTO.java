package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

public record BattleActionDTO(
        String roomId,
        String type,
        Integer sourceId
) {
}
