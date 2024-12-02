package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import lombok.Data;

@Data
public class PokemonActionDTO {
    String roomId;
    String type;
    Long sourcePlayerId;
    Long sourcePokemonId;
    Long sourceAttackId;
    Long targetPokemonId;
    Boolean success = false;
}
