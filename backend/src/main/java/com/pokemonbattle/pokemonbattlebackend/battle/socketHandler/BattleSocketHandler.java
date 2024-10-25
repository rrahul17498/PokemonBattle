package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleResponseHandler;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BattleSocketHandler {

    private final SocketIOServer server;

    public void broadcastBattleCreation(BattleResponseHandler battle) {
        this.server.getBroadcastOperations().sendEvent(BattleEvents.BATTLE_CREATED.name(), battle);
    }
}
