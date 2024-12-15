package com.pokemonbattle.pokemonbattlebackend.battle.cache;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BattleState implements Serializable {
    @Id
    private String roomId;
    private Integer battleId;
    private BattleStatus status;
    private Long firstPlayerId;
    private Long firstPlayerChosenPokemonId = null;
    private Map<Long, PokemonState> firstPlayerPokemonsStates;
    private Long secondPlayerId;
    private Long secondPlayerChosenPokemonId = null;
    private Map<Long, PokemonState> secondPlayerPokemonsStates;
    private Long winner;

    public BattleState(BattleResourcesDTO battleResourcesDTO) {
        this.roomId = battleResourcesDTO.roomId();
        this.battleId = battleResourcesDTO.battleId();
        this.status = battleResourcesDTO.status();

        this.firstPlayerId = battleResourcesDTO.firstPlayerId();
        this.firstPlayerPokemonsStates = new HashMap<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
              this.firstPlayerPokemonsStates.put(pokemon.getId(), new PokemonState(pokemon));
        }

        this.secondPlayerId = battleResourcesDTO.secondPlayerId();
        this.secondPlayerPokemonsStates = new HashMap<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
            this.secondPlayerPokemonsStates.put(pokemon.getId(), new PokemonState(pokemon));
        }
    }

    public void updateActivePokemon(Long playerId, Long pokemonId){
        if (Objects.equals(playerId, this.getFirstPlayerId())) {
            this.setFirstPlayerChosenPokemonId(pokemonId);
        } else if (Objects.equals(playerId, this.getSecondPlayerId())) {
            this.setSecondPlayerChosenPokemonId(pokemonId);
        }
    }
}
