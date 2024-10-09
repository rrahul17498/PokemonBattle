package com.pokemonbattle.pokemonbattlebackend.battle;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/battle")
@AllArgsConstructor
public class BattleController {

    private final BattleService battleService;

    @PostMapping("/create")
    public void createBattle(@RequestBody CreateBattleDTO createBattleRequest) {
       Battle createdBattle = this.battleService.createBattle(createBattleRequest);

    }

    @PostMapping("/connect")
    public void connectToBattle(@RequestBody ConnectBattleDTO connectBattleRequest) {
        Battle connectedBattle = this.battleService.connectToBattle(connectBattleRequest);
    }

}
