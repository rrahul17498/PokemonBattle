package com.pokemonbattle.pokemonbattlebackend.socket;

import com.corundumstudio.socketio.SocketIOServer;
import jakarta.annotation.PreDestroy;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ServerCommandLineRunner implements CommandLineRunner {

    private final SocketIOServer server;

    @Override
    public void run(String... args) throws Exception{
          this.server.start();
    }

    @PreDestroy
    public void onExit(){
        if(this.server != null) {
            this.server.stop();
        }
    }
}
