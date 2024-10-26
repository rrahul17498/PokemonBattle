package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;

import java.util.List;

public record LoadBattleDTO(
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId
) {
}
