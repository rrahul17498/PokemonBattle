package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;

import java.util.List;

public record BattleResourcesDTO(
        @JsonProperty("battle_id")
        Integer battleId,

        @JsonProperty("room_id")
        String roomId,

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
        public static BattleResourcesDTO getMinimalResources(Battle battle) {
                return new BattleResourcesDTO(
                        battle.getBattleId(),
                        battle.getRoomId(),
                        battle.getStatus(),
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                );
        }

        public static BattleResourcesDTO getFullResources(Battle battle, UserWithPokemonsDTO firstPlayerData, UserWithPokemonsDTO secondPlayerData) {
                return new BattleResourcesDTO(
                        battle.getBattleId(),
                        battle.getRoomId(),
                        battle.getStatus(),
                        firstPlayerData.id(),
                        firstPlayerData.name(),
                        firstPlayerData.ownedPokemons(),
                        secondPlayerData.id(),
                        secondPlayerData.name(),
                        secondPlayerData.ownedPokemons(),
                        battle.getWinner()
                );
        }

}
