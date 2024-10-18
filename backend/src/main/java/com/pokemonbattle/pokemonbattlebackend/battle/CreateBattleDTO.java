package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateBattleDTO {

    @JsonProperty("user_id")
    @Column(name = "user_id", nullable = false)
    private Long userId;
}
