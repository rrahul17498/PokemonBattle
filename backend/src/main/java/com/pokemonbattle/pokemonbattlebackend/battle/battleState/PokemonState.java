package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.Data;

@Data
public class PokemonState {
     Long id;
     Float health = 1.0F;

    public PokemonState(Pokemon pokemon) {
        this.id = pokemon.getId();
    }
}
