package com.pokemonbattle.pokemonbattlebackend.pokemon;

import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class PokemonRepository {

    private List<Pokemon> pokemons = new ArrayList<>();

    List<Pokemon> getAll() {
        return pokemons;
    }

    Optional<Pokemon> getById(int id) {
      return pokemons.stream().filter(pokemon -> pokemon.id() == id).findFirst();
    }

    void create(Pokemon pokemon) {
        pokemons.add(pokemon);
    }

    void update(Integer id, Pokemon pokemon) {
        Optional<Pokemon> existingPokemon = getById(id);

        if (existingPokemon.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        pokemons.set(pokemons.indexOf(existingPokemon.get()), pokemon);
    }

    void delete(Integer id) {
        Optional<Pokemon> existingPokemon = getById(id);

        if (existingPokemon.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        pokemons.removeIf(data -> data.id().equals(id));
    }



    @PostConstruct
    private void init() {
        pokemons.add(new Pokemon(1, "Charmander"));
        pokemons.add(new Pokemon(2, "Bulbasaur"));
    }
}
