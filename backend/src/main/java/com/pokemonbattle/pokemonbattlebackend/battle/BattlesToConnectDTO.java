package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;


public record BattlesToConnectDTO(
        @JsonProperty("battle_id")
        Integer battleId,
        @JsonProperty("first_player_id")
        Long firstPlayerId,
        @JsonProperty("first_player_name")
        String firstPlayerName
) {}
