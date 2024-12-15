package com.pokemonbattle.pokemonbattlebackend.battle.cache;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttackResources implements Serializable {
    List<AttackDTO> firstPlayerPokemonAttackResources;
    List<AttackDTO> secondPlayerPokemonAttackResources;



    public AttackResources(BattleResourcesDTO battleResourcesDTO) {
        this.firstPlayerPokemonAttackResources = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
            this.firstPlayerPokemonAttackResources.addAll(AttackDTO.from(pokemon.getId(), pokemon.getAttacks()));
        }

        this.secondPlayerPokemonAttackResources = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.secondPlayerOwnedPokemons()) {
            this.secondPlayerPokemonAttackResources.addAll(AttackDTO.from(pokemon.getId(), pokemon.getAttacks()));
        }
    }
}
