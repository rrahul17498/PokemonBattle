package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.BattleState;
import org.springframework.stereotype.Component;

@Component
public class BattleStateHandler {

    private final SocketIOServer server;

    public BattleStateHandler(SocketIOServer server) {
        this.server = server;
    }

    public void sendBattleStateToPlayers(BattleState battleState){
        this.server.getRoomOperations(battleState.getRoomId()).sendEvent(BattleActionEvents.BATTLE_STATE_UPDATE.name(), battleState);
    }

}
