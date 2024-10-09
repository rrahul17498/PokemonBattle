package com.pokemonbattle.pokemonbattlebackend.battle;

import com.pokemonbattle.pokemonbattlebackend.exception.ResourceInUseException;
import com.pokemonbattle.pokemonbattlebackend.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;

    Battle createBattle(CreateBattleDTO createBattleRequest){

        //  Validate user

        Battle newBattle = new Battle();

        newBattle.setFirstPlayerId(createBattleRequest.getUserId());
        newBattle.setStatus(BattleStatus.CREATED);

        return this.battleRepository.save(newBattle);
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

}
