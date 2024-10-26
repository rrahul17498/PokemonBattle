package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleSocketEventHandler;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceInUseException;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import com.pokemonbattle.pokemonbattlebackend.user.UserRepository;
import com.pokemonbattle.pokemonbattlebackend.user.UserService;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final BattleSocketEventHandler battleSocketHandler;

    BattleStateDTO createBattle(CreateBattleDTO createBattleRequest){
        User firstPlayer = this.userService.getUser(createBattleRequest.getUserId());

        Battle newBattle = new Battle();
        newBattle.setFirstPlayerId(firstPlayer.getId());
        newBattle.setFirstPlayerName(firstPlayer.getName());
        newBattle.setStatus(BattleStatus.CREATED);

        Battle createdBattle = this.battleRepository.save(newBattle);

        BattleStateDTO battleState = new BattleStateDTO(
                createdBattle.getId().toString(),
                createdBattle.getId(),
                createdBattle.getStatus(),
                createdBattle.getFirstPlayerId(),
                createdBattle.getFirstPlayerName(),
                null,
                createdBattle.getSecondPlayerId(),
                createdBattle.getSecondPlayerName(),
                null,
                createdBattle.getWinner()
        );

        this.battleSocketHandler.broadcastBattleCreation(battleState.battleId());

      return battleState;
    }

    BattleStateDTO connectToBattle(ConnectBattleDTO battleConnect){
        Battle existingBattle = this.battleRepository.findById(battleConnect.getBattleId())
                .orElseThrow(() -> new ResourceNotFoundException("Battle with id " + battleConnect.getBattleId() + " does not exist")
                );
        if (existingBattle.getSecondPlayerId() != null) {
            throw new ResourceInUseException("A battle with id " + battleConnect.getBattleId() + " in progress");
        }

        // Querying here to check user id validity and getting user name for battle object
        UserWithPokemonsDTO secondPlayerData = this.userService.getUserWithPokemons(battleConnect.getUserId());

        existingBattle.setSecondPlayerId(secondPlayerData.id());
        existingBattle.setSecondPlayerName(secondPlayerData.name());
        existingBattle.setStatus(BattleStatus.IN_PROGRESS);

        Battle savedBattle = this.battleRepository.save(existingBattle);

        UserWithPokemonsDTO firstPlayerData = this.userService.getUserWithPokemons(savedBattle.getFirstPlayerId());

        BattleStateDTO updatedBattleState = new BattleStateDTO(
                savedBattle.getId().toString(),
                savedBattle.getId(),
                savedBattle.getStatus(),
                firstPlayerData.id(),
                firstPlayerData.name(),
                firstPlayerData.ownedPokemons(),
                secondPlayerData.id(),
                secondPlayerData.name(),
                secondPlayerData.ownedPokemons(),
                savedBattle.getWinner()
        );

        this.battleSocketHandler.broadcastBattleConnection(updatedBattleState.battleId());

        return updatedBattleState;
    }


    List<Battle> getAllBattles() {
        return this.battleRepository.findByStatus(BattleStatus.CREATED);
    }

}
