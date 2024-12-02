package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import lombok.Data;

@Data
public class UserActionDTO {
    String roomId;
    String type;
    Long playerId;
    Long pokemonId;
    Boolean success = false;
}
