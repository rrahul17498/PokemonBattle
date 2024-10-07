package com.pokemonbattle.pokemonbattlebackend.pokemon;

import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.Attack;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class PokemonService {

       private final PokemonRepository pokemonRepository;
    private final AttackRepository attackRepository;

       public PokemonService(PokemonRepository pokemonRepository, AttackRepository attackRepository) {
           this.pokemonRepository = pokemonRepository;
           this.attackRepository = attackRepository;
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

           List<Attack> attacks = pokemon.getAttacks();

           for (Attack attack: attacks) {
               attack.setPokemon(pokemon);
           }

           pokemon.setAttacks(attacks);

           System.out.println("Pokemon:");
//           System.out.println(pokemon);
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

           List<Attack> attacks = pokemon.getAttacks();

           for (Attack attack: attacks) {
//               Optional<Attack> existingAttack = this.attackRepository.findById(attack.getId());

               attack.setPokemon(newPokemon);
           }

           newPokemon.setAttacks(attacks);

           this.pokemonRepository.save(newPokemon);
       }

       void deletePokemon(Long id) {
           this.pokemonRepository.deleteById(id);
       }

}
