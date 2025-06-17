package com.pokemonbattle.pokemonbattlebackend.pokemon.attack;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonRepository;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttackService {

    private final AttackRepository attackRepository;
    private final PokemonService pokemonService;

    public AttackService(AttackRepository attackRepository, PokemonService pokemonService) {
        this.attackRepository = attackRepository;
        this.pokemonService = pokemonService;
    }

    public void createAttack(Long pokemonId, AttackWithMediaDTO attackWithMediaDTO) {
        Pokemon pokemon = this.pokemonService.getPokemonById(pokemonId);

        Attack attackToBeCreated = AttackWithMediaDTO.createAttackEntityToSave(pokemon, attackWithMediaDTO);
        this.attackRepository.save(attackToBeCreated);
    }

    public void deleteAttack(Long attackId) {
        this.attackRepository.deleteById(attackId);
    }


}
