package com.pokemonbattle.pokemonbattlebackend.battle;

public record BattleMessageDTO(
        Integer battleId,
        BattleStatus status,
        Long firstPlayerId,
        String firstPlayerName,
        Integer firstPlayerPokemons
        ) {
}
