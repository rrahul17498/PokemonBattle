package com.pokemonbattle.pokemonbattlebackend.socket;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;


@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;


    public SocketModule(SocketIOServer server, SocketService socketService) {
        this.socketService = socketService;
        this.server = server;
        server.addConnectListener(onConnect());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("add_message", Message.class, onAddMessage());
    }

    private ConnectListener onConnect() {
        return (client) -> {

            String room = client.getHandshakeData().getSingleUrlParam("room");
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");
            client.joinRoom(room);

            log.info(
                    "Socket[{}] - User[{}] connected to room[{}]", client.getSessionId().toString(), userId, room);
        };
    }

    private DisconnectListener onDisconnected(){
        return (client) -> {
            Map<String, List<String>> params = client.getHandshakeData().getUrlParams();

            String room = client.getHandshakeData().getSingleUrlParam("room");
            String userId = client.getHandshakeData().getSingleUrlParam("user_id");

            log.info("Socket[{}] - User[{}] disconnected from room[{}]", client.getSessionId().toString(), userId, room);
        };
    }

    private DataListener<Message> onAddMessage(){
        return (senderClient, message, ackSender) -> {
            log.info("Added message: [{}]", message.toString());

            this.socketService.addMessage(senderClient, message);
        };
    }


}
