package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

public record PokemonActionDTO(
        String roomId,
        String type,
        Long playerId,
        Long pokemonId,
        Long payload
) {
}
