package com.pokemonbattle.pokemonbattlebackend.pokemon;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonRepository pokemonRepository;

    public PokemonController(PokemonRepository pokemonRepository) {
       this.pokemonRepository = pokemonRepository;
    }

    @GetMapping("")
    List<Pokemon> getAll() {
        return this.pokemonRepository.getAll();
    }

    @GetMapping("/{id}")
    Pokemon getById(@PathVariable Integer id) {

        Optional<Pokemon> pokemon = this.pokemonRepository.getById(id);

        if (pokemon.isEmpty()) {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return pokemon.get();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    void create(@RequestBody Pokemon pokemon) {
        this.pokemonRepository.create(pokemon);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id")
    void update(@RequestBody Pokemon pokemon, @PathVariable Integer id) {
        this.pokemonRepository.update(id, pokemon);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("")
    void delete(Integer id) {
        this.pokemonRepository.delete(id);
    }



}
