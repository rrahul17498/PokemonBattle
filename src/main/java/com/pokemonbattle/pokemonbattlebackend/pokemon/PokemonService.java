package com.pokemonbattle.pokemonbattlebackend.pokemon;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class PokemonService {

       private final PokemonRepository pokemonRepository;

       public PokemonService(PokemonRepository pokemonRepository) {
           this.pokemonRepository = pokemonRepository;
       }

       List<Pokemon> getAllPokemons() {
           return this.pokemonRepository.findAll();
       }

       Pokemon getPokemonById(Long id) {
           Optional<Pokemon> pokemon = this.pokemonRepository.findById(id);

           if (pokemon.isEmpty()) {
               throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
           }

           return pokemon.get();
       }

       void createPokemon(Pokemon pokemon) {
           this.pokemonRepository.save(pokemon);
       }

       void updatePokemon(Long id, Pokemon pokemon) {
           Optional<Pokemon> existingPokemon = this.pokemonRepository.findById(id);

           if (existingPokemon.isEmpty()) {
               throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
           }

           Pokemon newPokemon = existingPokemon.get();

           newPokemon.setName(pokemon.getName());
           newPokemon.setType(pokemon.getType());
           newPokemon.setImage(pokemon.getImage());
           newPokemon.setTheme_dark(pokemon.getTheme_dark());
           newPokemon.setTheme_light(pokemon.getTheme_light());

           this.pokemonRepository.save(newPokemon);
       }

       void deletePokemon(Long id) {
           this.pokemonRepository.deleteById(id);
       }

}
