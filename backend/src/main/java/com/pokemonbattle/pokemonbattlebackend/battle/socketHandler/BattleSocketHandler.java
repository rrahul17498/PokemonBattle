package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Slf4j
@Component
public class BattleSocketHandler {

    private final SocketIOServer server;
    private final Integer numberOfUsersPerRoom = 2;

    public BattleSocketHandler(SocketIOServer server) {
        this.server = server;
        this.server.addConnectListener(onUserConnect());
        this.server.addDisconnectListener(onUserDisconnect());
        this.server.addEventListener(BattleEvents.JOIN_BATTLE_ROOM.name(), String.class,onJoinBattleRoom());
        this.server.addEventListener(BattleEvents.INITIATE_BATTLE_LOAD.name(), InitiateBattleLoadDTO.class, initiateBattleLoad());
    }

    public ConnectListener onUserConnect() {
        return (client) -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");
            log.info("User[{}] connected with session[{}]", userId, client.getSessionId().toString());
        };
    }

    private DisconnectListener onUserDisconnect(){
        return (client) -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");
            log.info("User[{}] disconnected with session[{}]", userId, client.getSessionId().toString());
        };
    }

    public DataListener<String> onJoinBattleRoom() {
        return (client, roomId, ackClient) -> {
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");

            Collection<SocketIOClient> clients =  this.server.getRoomOperations(roomId).getClients();

            if (clients.size() < this.numberOfUsersPerRoom) {
                client.joinRoom(roomId);
                ackClient.sendAckData(new JoinRoomAcknowledgeDTO(true));
                log.info("User[{}] joined room[{}]", userId, roomId);
            } else {
                ackClient.sendAckData(new JoinRoomAcknowledgeDTO(false));
                log.info("Room[{}] is full", roomId);
            }

        };
    }

    public DataListener<InitiateBattleLoadDTO> initiateBattleLoad() {
        return (client, initiateBattleLoadDTO, ackClient) -> {
            log.info("Initiate battle[{}] in room[{}]", initiateBattleLoadDTO.battleId(), initiateBattleLoadDTO.roomId());
            this.server.getRoomOperations(initiateBattleLoadDTO.roomId()).sendEvent(BattleEvents.LOAD_BATTLE.name(), initiateBattleLoadDTO);
        };
    }

    public void broadcastBattleCreation(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleEvents.BROADCAST_BATTLE_CREATED.name(), battleId);
    }

    public void broadcastBattleConnection(Integer battleId) {
        this.server.getBroadcastOperations().sendEvent(BattleEvents.BROADCAST_BATTLE_CONNECTED.name(), battleId);
    }
}
