package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

public record PokemonActionDTO(
        String roomId,
        String type,
        Long sourcePlayerId,
        Long sourcePokemonId,
        Long sourceAttackId,
        Long targetPokemonId,
        Boolean completed
) {
}
