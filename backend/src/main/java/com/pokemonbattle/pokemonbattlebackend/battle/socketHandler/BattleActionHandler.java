package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.listener.DataListener;

public class BattleActionHandler {


    static DataListener<BattleActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            client.getNamespace().getRoomOperations(userAction.roomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }

    static DataListener<BattleActionDTO> executeUserPokemonAction() {
        return (client, pokemonAction, ackRequest) -> {
            client.getNamespace().getRoomOperations(pokemonAction.roomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
        };
    }
}
