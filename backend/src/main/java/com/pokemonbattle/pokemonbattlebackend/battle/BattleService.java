package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleConnectionHandler;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceInUseException;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import com.pokemonbattle.pokemonbattlebackend.user.UserRepository;
import com.pokemonbattle.pokemonbattlebackend.user.UserService;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final BattleConnectionHandler battleSocketHandler;

    Battle createBattle(CreateBattleDTO createBattleRequest){
        User firstPlayer = this.userService.getUser(createBattleRequest.getUserId());

        Battle newBattle = new Battle();
        newBattle.setFirstPlayerId(firstPlayer.getId());
        newBattle.setFirstPlayerName(firstPlayer.getName());
        newBattle.setStatus(BattleStatus.CREATED);
        newBattle.setRoomId(UUID.randomUUID().toString());

        Battle createdBattle = this.battleRepository.save(newBattle);

        this.battleSocketHandler.broadcastBattleCreation(createdBattle.getBattleId());

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
        existingBattle.setStatus(BattleStatus.IN_PROGRESS);

        Battle savedBattle = this.battleRepository.save(existingBattle);

        this.battleSocketHandler.broadcastBattleConnection(savedBattle.getBattleId());

        return savedBattle;
    }

    BattleStateDTO getBattle(Integer battleId){
       Battle existingBattle = this.battleRepository.findById(battleId)
               .orElseThrow(() -> new ResourceNotFoundException("Battle with id " + battleId + " does not exist"));

       UserWithPokemonsDTO firstPlayerData = this.userService.getUserWithPokemons(existingBattle.getFirstPlayerId());
       UserWithPokemonsDTO secondPlayerData = this.userService.getUserWithPokemons(existingBattle.getSecondPlayerId());

       return new BattleStateDTO(
               existingBattle.getBattleId(),
               existingBattle.getRoomId(),
               existingBattle.getStatus(),
               firstPlayerData.id(),
               firstPlayerData.name(),
               firstPlayerData.ownedPokemons(),
               secondPlayerData.id(),
               secondPlayerData.name(),
               secondPlayerData.ownedPokemons(),
               existingBattle.getWinner()
       );
    }


    List<BattleResponseDTO> getAllBattles() {
        return this.battleRepository.findByStatus(BattleStatus.CREATED);
    }

}
