package com.pokemonbattle.pokemonbattlebackend.battle;


import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleSocketEventHandler;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/battles")
@AllArgsConstructor
public class BattleController {

    private final BattleService battleService;
    private final BattleSocketEventHandler battleSocketHandler;

    @PostMapping("/create")
    public BattleStateDTO createBattle(@RequestBody CreateBattleDTO createBattleRequest) {
       return this.battleService.createBattle(createBattleRequest);
    }

    @PostMapping("/connect")
    public BattleStateDTO connectToBattle(@RequestBody ConnectBattleDTO connectBattleRequest) {
        return this.battleService.connectToBattle(connectBattleRequest);
    }

    @GetMapping
    public List<Battle> getAllBattles() {
        return this.battleService.getAllBattles();
    }
}
