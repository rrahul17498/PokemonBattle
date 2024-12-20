package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BattleRoomDisconnectDTO(
        @JsonProperty("user_id")
        Long userId,
        @JsonProperty("room_id")
        String roomId,
        @JsonProperty("battle_id")
        Integer battleId,
        @JsonProperty("did_exit_room")
        Boolean didExitRoom
) {

    static BattleRoomDisconnectDTO createAcknowledgement(BattleRoomDisconnectDTO battleConnectionDTO, Boolean exitRoomStatus) {
        return new BattleRoomDisconnectDTO(
                battleConnectionDTO.userId(),
                battleConnectionDTO.roomId(),
                battleConnectionDTO.battleId(),
                exitRoomStatus
        );
    }
}
