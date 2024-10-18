package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ConnectBattleDTO {
    @JsonProperty("battle_id")
    private Integer battleId;
    @JsonProperty("user_id")
    private Long userId;
}
