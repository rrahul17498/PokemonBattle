package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleSocketHandler;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceInUseException;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import com.pokemonbattle.pokemonbattlebackend.user.UserRepository;
import com.pokemonbattle.pokemonbattlebackend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final BattleSocketHandler battleSocketHandler;

    Battle createBattle(CreateBattleDTO createBattleRequest){
        User firstPlayer = this.userService.getUser(createBattleRequest.getUserId());

        Battle newBattle = new Battle();
        newBattle.setFirstPlayerId(firstPlayer.getId());
        newBattle.setFirstPlayerName(firstPlayer.getName());
        newBattle.setStatus(BattleStatus.CREATED);

        Battle createdBattle = this.battleRepository.save(newBattle);

        this.battleSocketHandler.broadcastBattleCreation(createdBattle.getId());

      return createdBattle;
    }

    Battle connectToBattle(ConnectBattleDTO battleConnect){
        Battle existingBattle = this.battleRepository.findById(battleConnect.getBattleId())
                .orElseThrow(() -> new ResourceNotFoundException("Battle with id " + battleConnect.getBattleId() + " does not exist")
                );

        if (existingBattle.getSecondPlayerId() != null) {
            throw new ResourceInUseException("A battle with id " + battleConnect.getBattleId() + " in progress");
        }

        User secondPlayer = this.userService.getUser(battleConnect.getUserId());
        existingBattle.setSecondPlayerId(secondPlayer.getId());
        existingBattle.setSecondPlayerName(secondPlayer.getName());

        Battle savedBattle = this.battleRepository.save(existingBattle);

        this.battleSocketHandler.broadcastBattleConnection(savedBattle.getId());

        return savedBattle;
    }


    List<Battle> getAllBattles() {
        return this.battleRepository.findByStatus(BattleStatus.CREATED);
    }

}
