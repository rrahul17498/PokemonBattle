package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;

public record InitiateBattleLoadDTO(
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId
) {
}
