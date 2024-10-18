package com.pokemonbattle.pokemonbattlebackend.user;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;

import java.util.List;

public record UserWithPokemonsDTO(
        Long id,
        String name,
        List<Pokemon> ownedPokemons
) {

}
