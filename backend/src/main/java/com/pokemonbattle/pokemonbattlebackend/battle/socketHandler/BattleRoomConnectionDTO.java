package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BattleRoomConnectionDTO(
        @JsonProperty("user_id")
        Long userId,
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId,
        @JsonProperty("did_join_room")
        Boolean didJoinRoom
) {

        static BattleRoomConnectionDTO createAcknowledgement(BattleRoomConnectionDTO battleConnectionDTO, Boolean joinRoomStatus) {
                return new BattleRoomConnectionDTO(
                        battleConnectionDTO.userId(),
                        battleConnectionDTO.roomId(),
                        battleConnectionDTO.battleId(),
                        joinRoomStatus
                );
        }

}
