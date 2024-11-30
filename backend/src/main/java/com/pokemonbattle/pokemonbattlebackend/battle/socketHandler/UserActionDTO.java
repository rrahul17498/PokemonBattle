package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

public record UserActionDTO(
        String roomId,
        String type,
        Long playerId,
        Long pokemonId,
        Boolean completed
) {
}
