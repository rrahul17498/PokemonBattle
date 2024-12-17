package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.pokemonbattle.pokemonbattlebackend.battle.cache.PokemonState;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class AttackResultDTO {
    Map<Long, PokemonState> updatedOpponentPokemonStateList = new HashMap<>();
    Long battleWinner = null;
}
