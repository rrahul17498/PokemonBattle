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
        this.server.addEventListener(BattleConnectionEvents.JOIN_BATTLE_ROOM.name(), BattleRoomConnectionDTO.class, onJoinBattleRoom());
        this.server.addEventListener(BattleConnectionEvents.INITIATE_BATTLE.name(), BattleRoomConnectionDTO.class, initiateBattle());
        this.server.addEventListener(BattleConnectionEvents.EXIT_BATTLE_ROOM.name(), BattleRoomDisconnectDTO.class, onExitBattleRoom());
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

    public DataListener<BattleRoomConnectionDTO> onJoinBattleRoom() {
        return (client, battleRoomConnectionDTO, ackClient) -> {
            int numOfClients =  this.server.getRoomOperations(battleRoomConnectionDTO.roomId()).getClients().size();
            if (numOfClients < this.allowedUsersPerRoom) {
                client.joinRoom(battleRoomConnectionDTO.roomId());
                ackClient.sendAckData(BattleRoomConnectionDTO.createAcknowledgement(battleRoomConnectionDTO, true));
                log.info("User[{}] joined room[{}]", battleRoomConnectionDTO.userId(), battleRoomConnectionDTO.roomId());
            } else {
                ackClient.sendAckData(BattleRoomConnectionDTO.createAcknowledgement(battleRoomConnectionDTO, false));
                log.info("Room[{}] is full", battleRoomConnectionDTO.roomId());
            }
        };
    }

    public DataListener<BattleRoomDisconnectDTO> onExitBattleRoom() {
        return (client, battleRoomDisconnectDTO, ackclient) -> {
            client.leaveRoom(battleRoomDisconnectDTO.roomId());
            ackclient.sendAckData(BattleRoomDisconnectDTO.createAcknowledgement(battleRoomDisconnectDTO, true));
            log.info("User[{}] exited from room[{}]", battleRoomDisconnectDTO.userId(), battleRoomDisconnectDTO.roomId());
        };
    }

    public DataListener<BattleRoomConnectionDTO> initiateBattle() {
        return (client, battleRoomConnectionDTO, ackClient) -> {
            log.info("Initiate battle[{}] in room[{}]", battleRoomConnectionDTO.battleId(), battleRoomConnectionDTO.roomId());
            this.server.getRoomOperations(battleRoomConnectionDTO.roomId()).sendEvent(BattleConnectionEvents.LOAD_BATTLE_RESOURCES.name(), battleRoomConnectionDTO);
        };
    }

    public void broadcastBattleCreation(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleConnectionEvents.BROADCAST_BATTLE_CREATED.name(), battleId);
    }

    public void broadcastBattleConnection(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleConnectionEvents.BROADCAST_BATTLE_CONNECTED.name(), battleId);
    }

    public void broadcastBattleDeletion(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleConnectionEvents.BROADCAST_BATTLE_DELETED.name(), battleId);
    }
}
