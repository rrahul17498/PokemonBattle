package com.pokemonbattle.pokemonbattlebackend.socket;


import com.corundumstudio.socketio.SocketIOClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SocketService {

    public void addMessage(SocketIOClient senderClient, Message message) {
        for (SocketIOClient client: senderClient.getNamespace().getRoomOperations(message.getRoom()).getClients()){
            client.sendEvent("get_message", message);
        }
    }

}
