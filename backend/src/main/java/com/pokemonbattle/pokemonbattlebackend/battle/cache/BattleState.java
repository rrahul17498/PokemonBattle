package com.pokemonbattle.pokemonbattlebackend.battle.gameManagement;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private List<PokemonState> firstPlayerPokemonsState;
    private Long secondPlayerId;
    private Long secondPlayerChosenPokemonId = null;
    private List<PokemonState> secondPlayerPokemonsState;
    private Long winner;

    public BattleState(BattleResourcesDTO battleResourcesDTO) {
        this.roomId = battleResourcesDTO.roomId();
        this.battleId = battleResourcesDTO.battleId();
        this.status = battleResourcesDTO.status();

        this.firstPlayerId = battleResourcesDTO.firstPlayerId();
        this.firstPlayerPokemonsState = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
              this.firstPlayerPokemonsState.add(new PokemonState(pokemon));
        }

        this.secondPlayerId = battleResourcesDTO.secondPlayerId();
        this.secondPlayerPokemonsState = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
            this.secondPlayerPokemonsState.add(new PokemonState(pokemon));
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
