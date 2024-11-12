package com.pokemonbattle.pokemonbattlebackend.battle.battleState;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleService;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleConnectionHandler;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BattleStateService {
    private final BattleStateRepository battleStateRepository;
    private final RedisTemplate<String, BattleState> redisTemplate;
    private final BattleConnectionHandler battleSocketHandler;

    public BattleState getBattleState(String roomId) {
        return this.battleStateRepository.findById(roomId).orElse(null);
    }

    public BattleState createBattleStateFromResources(BattleResourcesDTO battleResourcesDTO){
        BattleState battleState = new BattleState();
        battleState.setRoomId(battleResourcesDTO.roomId());
        battleState.setBattleId(battleResourcesDTO.battleId());
        battleState.setStatus(battleResourcesDTO.status());

        List<Pokemon> firstPlayerOwnedPokemons = battleResourcesDTO.firstPlayerOwnedPokemons();
        List<Pokemon> secondPlayerOwnedPokemons = battleResourcesDTO.secondPlayerOwnedPokemons();
        int pokemonAssignLimit = Math.min(firstPlayerOwnedPokemons.size(), secondPlayerOwnedPokemons.size());

        for (int i = 0; i < pokemonAssignLimit; i++) {
            Pokemon firstPlayerPokemonByIndex = firstPlayerOwnedPokemons.get(i);
            Pokemon secondPlayerPokemonByIndex = secondPlayerOwnedPokemons.get(i);

            switch (i) {
                case 0:
                    battleState.setFirstPlayerPokemon1Id(firstPlayerPokemonByIndex.getId());
                    battleState.setFirstPlayerPokemon1Health(1.0F);
                    battleState.setSecondPlayerPokemon1Id(secondPlayerPokemonByIndex.getId());
                    battleState.setSecondPlayerPokemon1Health(1.0F);
                    break;
                case 1:
                    battleState.setFirstPlayerPokemon2Id(firstPlayerPokemonByIndex.getId());
                    battleState.setFirstPlayerPokemon2Health(1.0F);
                    battleState.setSecondPlayerPokemon2Id(secondPlayerPokemonByIndex.getId());
                    battleState.setSecondPlayerPokemon2Health(1.0F);
                    break;
                case 2:
                    battleState.setFirstPlayerPokemon3Id(firstPlayerPokemonByIndex.getId());
                    battleState.setFirstPlayerPokemon3Health(1.0F);
                    battleState.setSecondPlayerPokemon3Id(secondPlayerPokemonByIndex.getId());
                    battleState.setSecondPlayerPokemon3Health(1.0F);
                    break;
            }
        }

        return battleState;
    }

    public void createAndSaveBattleStateWithTTL(BattleResourcesDTO battleResourcesDTO) {
        Optional<BattleState> existingBattleState = this.battleStateRepository.findById(battleResourcesDTO.roomId());

        if (existingBattleState.isPresent()) {
            this.battleSocketHandler.sendBattleStateToPlayers(existingBattleState.get());
            return;
        }

        BattleState battleState = this.createBattleStateFromResources(battleResourcesDTO);
        BattleState savedBattleState = this.battleStateRepository.save(battleState);
        redisTemplate.expire(battleState.getRoomId(),30, TimeUnit.MINUTES);

        this.battleSocketHandler.sendBattleStateToPlayers(savedBattleState);
    }

    public BattleState saveBattleState(BattleState battleState) {
        BattleState savedBattleState = this.battleStateRepository.save(battleState);
        this.battleSocketHandler.sendBattleStateToPlayers(savedBattleState);
        return savedBattleState;
    }

    public void deleteBattleState(String roomId) {
        this.battleStateRepository.deleteById(roomId);
    }


}
