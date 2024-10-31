package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class BattleConnectionHandler {

    private final SocketIOServer server;
    private final Integer allowedUsersPerRoom = 2;

    public BattleConnectionHandler(SocketIOServer server) {
        this.server = server;
        this.server.addConnectListener(onUserSocketConnect());
        this.server.addDisconnectListener(onUserSocketDisconnect());
        this.server.addEventListener(BattleConnectionEvents.JOIN_BATTLE_ROOM.name(), BattleConnectionDTO.class,onJoinBattleRoom());
        this.server.addEventListener(BattleConnectionEvents.INITIATE_BATTLE_LOAD.name(), BattleConnectionDTO.class, initiateLoadBattleResources());
        this.server.addEventListener(BattleActionEvents.USER_ACTION.name(), BattleActionDTO.class, BattleActionHandler.executeUserAction());
        this.server.addEventListener(BattleActionEvents.POKEMON_ACTION.name(), BattleActionDTO.class, BattleActionHandler.executeUserPokemonAction());
    }

    public ConnectListener onUserSocketConnect() {
        return (client) -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");
            log.info("User[{}] connected with session[{}]", userId, client.getSessionId().toString());
        };
    }

    private DisconnectListener onUserSocketDisconnect(){
        return (client) -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");
            log.info("User[{}] disconnected with session[{}]", userId, client.getSessionId().toString());
        };
    }

    public DataListener<BattleConnectionDTO> onJoinBattleRoom() {
        return (client, battleConnectionDTO, ackClient) -> {
            int numOfClients =  this.server.getRoomOperations(battleConnectionDTO.roomId()).getClients().size();
            if (numOfClients < this.allowedUsersPerRoom) {
                client.joinRoom(battleConnectionDTO.roomId());
                ackClient.sendAckData(BattleConnectionDTO.createAcknowledgement(battleConnectionDTO, true));
                log.info("User[{}] joined room[{}]", battleConnectionDTO.userId(), battleConnectionDTO.roomId());
            } else {
                ackClient.sendAckData(BattleConnectionDTO.createAcknowledgement(battleConnectionDTO, false));
                log.info("Room[{}] is full", battleConnectionDTO.roomId());
            }
        };
    }

    public DataListener<BattleConnectionDTO> initiateLoadBattleResources() {
        return (client, battleConnectionDTO, ackClient) -> {
            log.info("Initiate battle[{}] in room[{}]", battleConnectionDTO.battleId(), battleConnectionDTO.roomId());
            this.server.getRoomOperations(battleConnectionDTO.roomId()).sendEvent(BattleConnectionEvents.LOAD_BATTLE_RESOURCES.name(), battleConnectionDTO);
        };
    }

    public void broadcastBattleCreation(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleConnectionEvents.BROADCAST_BATTLE_CREATED.name(), battleId);
    }

    public void broadcastBattleConnection(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleConnectionEvents.BROADCAST_BATTLE_CONNECTED.name(), battleId);
    }
}
