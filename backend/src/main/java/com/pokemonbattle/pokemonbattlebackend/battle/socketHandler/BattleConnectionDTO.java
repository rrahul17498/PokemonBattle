package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BattleConnectionDTO(
        @JsonProperty("user_id")
        String userId,
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId,
        @JsonProperty("did_join_room")
        Boolean didJoinRoom
) {


}
