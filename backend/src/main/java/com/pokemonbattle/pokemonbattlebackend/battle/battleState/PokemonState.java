package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.Data;

@Data
public class PokemonState {
     Long id;
     Integer health = 100;

    public PokemonState(Pokemon pokemon) {
        this.id = pokemon.getId();
    }

    public void receiveDamage(AttackDTO attackDTO) {
        this.health = Math.max(0, Math.min(100, this.health - attackDTO.getPower()));
    }
}
