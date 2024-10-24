package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleSocketHandler;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceInUseException;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceNotFoundException;
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
    private final BattleSocketHandler battleSocketHandler;

    BattleResponseHandler createBattle(CreateBattleDTO createBattleRequest){
        UserWithPokemonsDTO firstPlayerData = this.userService.getUserWithPokemons(createBattleRequest.getUserId());

        Battle newBattle = new Battle();
        newBattle.setFirstPlayerId(firstPlayerData.id());
        newBattle.setFirstPlayerName(firstPlayerData.name());
        newBattle.setStatus(BattleStatus.CREATED);

        Battle createdBattle = this.battleRepository.save(newBattle);
        BattleResponseHandler createdBattleResponse = BattleResponseHandler.createBattleResponse(createdBattle, firstPlayerData);

        this.battleSocketHandler.broadcastBattleCreation(createdBattleResponse);

      return createdBattleResponse;
    }

    Battle connectToBattle(ConnectBattleDTO battleConnect){

        //  Validate user

        System.out.println("I start here");

        Battle existingBattle = this.battleRepository.findById(battleConnect.getBattleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Battle with id " + battleConnect.getBattleId() + " does not exist")
                                );

        if (existingBattle.getSecondPlayerId() != null) {
            throw new ResourceInUseException("A battle with id " + battleConnect.getBattleId() + " in progress");
        }

        existingBattle.setSecondPlayerId(battleConnect.getUserId());
        existingBattle.setStatus(BattleStatus.IN_PROGRESS);

        return this.battleRepository.save(existingBattle);
    }


    List<Battle> getAllBattles() {
        return this.battleRepository.findAll();
    }

}
