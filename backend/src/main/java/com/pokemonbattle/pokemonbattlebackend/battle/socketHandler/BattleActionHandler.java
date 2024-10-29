package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.listener.DataListener;

public class BattleActionHandler {


    static DataListener<UserActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            client.getNamespace().getRoomOperations(userAction.roomId()).sendEvent(BattleEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }
}
