package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;

import java.util.List;

public record BattleRoomMessageDTO(
        String roomId,
        BattleRoomMessageSource source,
        Integer id,

        BattleStatus status,

        @JsonProperty("first_player_id")
        Long firstPlayerId,

        @JsonProperty("first_player_name")
        String firstPlayerName,

        @JsonProperty("first_player_owned_pokemons")
        List<Pokemon> firstPlayerOwnedPokemons,

        @JsonProperty("second_player_id")
        Long secondPlayerId,

        @JsonProperty("second_player_name")
        String secondPlayerName,

        @JsonProperty("second_player_owned_pokemons")
        List<Pokemon> secondPlayerOwnedPokemons,

        Long winner
) {
}
