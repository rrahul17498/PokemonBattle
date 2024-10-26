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
    public Battle createBattle(@RequestBody CreateBattleDTO createBattleRequest) {
       return this.battleService.createBattle(createBattleRequest);
    }

    @PostMapping("/connect")
    public Battle connectToBattle(@RequestBody ConnectBattleDTO connectBattleRequest) {
        return this.battleService.connectToBattle(connectBattleRequest);
    }

    @GetMapping("/{battleId}")
    public BattleStateDTO connectToBattle(@PathVariable Integer battleId) {
        return this.battleService.getBattle(battleId);
    }

    @GetMapping
    public List<Battle> getAllBattles() {
        return this.battleService.getAllBattles();
    }
}
