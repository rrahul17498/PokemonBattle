package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BattleConnectionDTO(
        @JsonProperty("user_id")
        Long userId,
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId,
        @JsonProperty("did_join_room")
        Boolean didJoinRoom
) {

        static BattleConnectionDTO createAcknowledgement(BattleConnectionDTO battleConnectionDTO, Boolean joinRoomStatus) {
                return new BattleConnectionDTO(
                        battleConnectionDTO.userId(),
                        battleConnectionDTO.roomId(),
                        battleConnectionDTO.battleId(),
                        joinRoomStatus
                );
        }

}
