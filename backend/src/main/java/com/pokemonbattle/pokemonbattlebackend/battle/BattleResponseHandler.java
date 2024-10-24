package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;

import java.util.List;

public record BattleResponseHandler(
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



    static BattleResponseHandler createBattleResponse(Battle battle, User firstPlayer) {
        return new BattleResponseHandler(
                battle.getId(),
                battle.getStatus(),
                firstPlayer.getId(),
                firstPlayer.getName(),
                null,
                null,
                null,
                null,
                null
        );
    }

    static BattleResponseHandler connectBattleResponse(
            Battle battle, UserWithPokemonsDTO firstPlayerData, UserWithPokemonsDTO secondPlayerData
    ) {
        return new BattleResponseHandler(
                battle.getId(),
                battle.getStatus(),
                firstPlayerData.id(),
                firstPlayerData.name(),
                firstPlayerData.ownedPokemons(),
                secondPlayerData.id(),
                secondPlayerData.name(),
                secondPlayerData.ownedPokemons(),
                null
        );
    }

}
