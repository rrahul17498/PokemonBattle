package com.pokemonbattle.pokemonbattlebackend.pokemon;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
       this.pokemonService = pokemonService;
    }

    @GetMapping("")
    List<Pokemon> getAllPokemons() {
        return this.pokemonService.getAllPokemons();
    }

    @GetMapping("/{id}")
    Pokemon getPokemonById(@PathVariable Long id) {
        return this.pokemonService.getPokemonById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    void createPokemon(@RequestBody Pokemon pokemon) {
        this.pokemonService.createPokemon(pokemon);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void updatePokemon( @PathVariable Long id, @RequestBody Pokemon pokemon) {
        this.pokemonService.updatePokemon(id, pokemon);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void deletePokemon(@PathVariable Long id) {
        this.pokemonService.deletePokemon(id);
    }

}
