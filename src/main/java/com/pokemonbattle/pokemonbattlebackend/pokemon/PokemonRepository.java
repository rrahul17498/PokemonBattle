package com.pokemonbattle.pokemonbattlebackend.pokemon;

import jakarta.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.List;

public class PokemonRepository {

    private List<Pokemon> pokemons = new ArrayList<>();

    List<Pokemon> getAllPokemons() {
        return pokemons;
    }

    @PostConstruct
    private void init() {
        pokemons.add(new Pokemon(1, "Charmander"));
        pokemons.add(new Pokemon(2, "Bulbasaur"));
    }
}
