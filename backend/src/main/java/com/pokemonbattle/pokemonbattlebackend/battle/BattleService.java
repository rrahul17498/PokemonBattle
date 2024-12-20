package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.battle.cache.AttackResourceRepository;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.BattleState;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.BattleStateRepository;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.BattleInProgressException;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.BattleNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleActionHandler;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleConnectionHandler;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleStateHandler;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import com.pokemonbattle.pokemonbattlebackend.user.UserService;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;
    private final UserService userService;
    private final BattleConnectionHandler battleConnectionHandler;
    private final BattleStateHandler battleStateHandler;
    private final BattleStateRepository battleStateRepository;
    private final AttackResourceRepository attackResourceRepository;

    Battle createBattle(CreateBattleDTO createBattleRequest){
        User firstPlayer = this.userService.getUser(createBattleRequest.getUserId());

        Battle newBattle = new Battle();
        newBattle.setFirstPlayerId(firstPlayer.getId());
        newBattle.setFirstPlayerName(firstPlayer.getName());
        newBattle.setStatus(BattleStatus.CREATED);
        newBattle.setRoomId(UUID.randomUUID().toString());

        Battle createdBattle = this.battleRepository.save(newBattle);

        this.battleConnectionHandler.broadcastBattleCreation(createdBattle.getBattleId());

        return createdBattle;
    }

    Battle connectToBattle(ConnectBattleDTO battleConnect){
        Battle existingBattle = this.battleRepository.findById(battleConnect.getBattleId())
                .orElseThrow(() -> new BattleNotFoundException(BattleAccessFromTypes.BATTLE, battleConnect.getBattleId())
                );

        if (existingBattle.getSecondPlayerId() != null) {
            throw new BattleInProgressException(battleConnect.getBattleId());
        }

        User secondPlayer = this.userService.getUser(battleConnect.getUserId());
        existingBattle.setSecondPlayerId(secondPlayer.getId());
        existingBattle.setSecondPlayerName(secondPlayer.getName());
        existingBattle.setStatus(BattleStatus.IN_PROGRESS);

        Battle savedBattle = this.battleRepository.save(existingBattle);

        this.battleConnectionHandler.broadcastBattleConnection(savedBattle.getBattleId());
        return savedBattle;
    }

    BattleResourcesDTO loadBattleResourcesById(Integer battleId, String roomId){
       Battle existingBattle = this.battleRepository.findById(battleId)
               .orElseThrow(() -> new BattleNotFoundException(BattleAccessFromTypes.BATTLE, battleId));

       if (!existingBattle.getRoomId().equals(roomId)) {
           throw new BattleNotFoundException(BattleAccessFromTypes.ROOM, roomId);
       }

       UserWithPokemonsDTO firstPlayerData = this.userService.getUserWithPokemons(existingBattle.getFirstPlayerId());
       UserWithPokemonsDTO secondPlayerData = this.userService.getUserWithPokemons(existingBattle.getSecondPlayerId());
       BattleResourcesDTO battleResourcesDTO = BattleResourcesDTO.getFullResources(existingBattle, firstPlayerData, secondPlayerData);

       this.attackResourceRepository.save(battleResourcesDTO);
       BattleState loadedBattleState = this.battleStateRepository.save(battleResourcesDTO);

       this.battleStateHandler.sendBattleStateToPlayers(loadedBattleState);

       return battleResourcesDTO;
    }

    BattleResourcesDTO getActiveBattleByUserId(Long userId) {
        List<String> activeStatuses = List.of(BattleStatus.CREATED.name(), BattleStatus.IN_PROGRESS.name());

        Optional<Battle> activeBattleResult = this.battleRepository.findActiveBattle(userId, activeStatuses);

        if (activeBattleResult.isEmpty()) {
            throw new BattleNotFoundException(BattleAccessFromTypes.USER, userId);
        }

        Battle activeBattle = activeBattleResult.get();

        return BattleResourcesDTO.getMinimalResources(activeBattle);
    }

    void deleteBattle(Integer battleId) {
        this.battleRepository.deleteById(battleId);
        this.battleConnectionHandler.broadcastBattleDeletion(battleId);
    }


    List<BattlesToConnectDTO> getCreatedBattles() {
        return this.battleRepository.findByStatus(BattleStatus.CREATED);
    }

    public void markBattleAsCompleted(Integer battleId, Long winner){
        Battle battle = this.battleRepository.findById(battleId).orElseThrow(() -> new BattleNotFoundException(BattleAccessFromTypes.BATTLE, battleId));
        battle.setWinner(winner);
        battle.setStatus(BattleStatus.COMPLETED);
        this.battleRepository.save(battle);
    }

}
