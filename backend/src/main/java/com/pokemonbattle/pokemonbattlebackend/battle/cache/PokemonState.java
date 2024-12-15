package com.pokemonbattle.pokemonbattlebackend.battle.cache;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackDTO;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class PokemonState {
     Long id;
     Integer health;
     @Enumerated(EnumType.STRING)
     PokemonStatus status;

    public PokemonState(Pokemon pokemon) {
        this.id = pokemon.getId();
        this.health = 100;
        this.status = PokemonStatus.ACTIVE;
    }

    public void receiveDamage(AttackDTO attackDTO) {
        this.health = Math.max(0, Math.min(100, this.health - attackDTO.getPower()));
    }

    public void markAsDefeated() {
        this.status = PokemonStatus.DEFEATED;
    }
}
