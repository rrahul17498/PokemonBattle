package com.pokemonbattle.pokemonbattlebackend.battle;


import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.BattleInProgressException;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.BattleNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleConnectionHandler;
import com.pokemonbattle.pokemonbattlebackend.restApi.GlobalRestAPIErrorResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/battles")
@AllArgsConstructor
public class BattleController {

    private final BattleService battleService;
    private final BattleConnectionHandler battleSocketHandler;

    @PostMapping("/create")
    public Battle createBattle(@RequestBody CreateBattleDTO createBattleRequest) {
       return this.battleService.createBattle(createBattleRequest);
    }

    @PostMapping("/connect")
    public Battle connectToBattle(@RequestBody ConnectBattleDTO connectBattleRequest) {
        return this.battleService.connectToBattle(connectBattleRequest);
    }

    @GetMapping("/{battleId}/load/{roomId}")
    public BattleResourcesDTO loadBattleResourcesById(@PathVariable Integer battleId, @PathVariable String roomId) {
        return this.battleService.loadBattleResourcesById(battleId, roomId);
    }

    @GetMapping("/active/{userId}")
    public BattleResourcesDTO getActiveBattleByUserId(@PathVariable Long userId) {
        return this.battleService.getActiveBattleByUserId(userId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{battleId}")
    public void deleteBattle(@PathVariable Integer battleId) {
        this.battleService.deleteBattle(battleId);
    }

    @GetMapping
    public List<BattlesToConnectDTO> getAllBattles()
    {
        return this.battleService.getCreatedBattles();
    }

    @ExceptionHandler(BattleNotFoundException.class)
    public ResponseEntity<GlobalRestAPIErrorResponse> handleBattleNotFoundException (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GlobalRestAPIErrorResponse(
                e.getMessage()
        ));
    };

    @ExceptionHandler(BattleInProgressException.class)
    public ResponseEntity<GlobalRestAPIErrorResponse> handleBattleInProgressException (Exception e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new GlobalRestAPIErrorResponse(
                e.getMessage()
        ));
    };
}
