package com.pokemonbattle.pokemonbattlebackend.battle;


import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleSocketHandler;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/battles")
@AllArgsConstructor
public class BattleController {

    private final BattleService battleService;
    private final BattleSocketHandler battleSocketHandler;

    @PostMapping("/create")
    public BattleResponseHandler createBattle(@RequestBody CreateBattleDTO createBattleRequest) {
       return this.battleService.createBattle(createBattleRequest);
    }

    @PostMapping("/connect")
    public BattleResponseHandler connectToBattle(@RequestBody ConnectBattleDTO connectBattleRequest) {
        return this.battleService.connectToBattle(connectBattleRequest);
    }

    @GetMapping
    public List<Battle> getAllBattles() {
        return this.battleService.getAllBattles();
    }
}
