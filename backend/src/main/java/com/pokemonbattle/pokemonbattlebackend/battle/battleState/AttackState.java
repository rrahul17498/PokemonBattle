package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.Attack;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class AttackState implements Serializable {
    List<AttackDTO> firstPlayerPokemonAttackList;
    List<AttackDTO> secondPlayerPokemonAttackList;

    public AttackState(BattleResourcesDTO battleResourcesDTO) {
        this.firstPlayerPokemonAttackList = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.firstPlayerOwnedPokemons()) {
            this.firstPlayerPokemonAttackList.addAll(AttackDTO.from(pokemon.getId(), pokemon.getAttacks()));
        }

        this.secondPlayerPokemonAttackList = new ArrayList<>();
        for (Pokemon pokemon: battleResourcesDTO.secondPlayerOwnedPokemons()) {
            this.secondPlayerPokemonAttackList.addAll(AttackDTO.from(pokemon.getId(), pokemon.getAttacks()));
        }
    }
}
