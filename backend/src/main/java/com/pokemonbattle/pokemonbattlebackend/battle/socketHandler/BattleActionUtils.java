package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.BattleState;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.PokemonState;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.AttackNotFoundInAttackResources;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.ActivePokemonNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.PokemonNotFoundInPokemonsState;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackDTO;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public class BattleActionUtils {


    static AttackResultDTO  executeAttackAndUpdateOpponentPokemonsState(Map<Long, PokemonState> opponentPokemonStates, List<AttackDTO> sourceUserPokemonsAttackList, PokemonActionDTO pokemonActionDTO) {
        Optional<AttackDTO> sourcePokemonAttackDTOOptional = sourceUserPokemonsAttackList.stream().filter((item) -> item.getId().equals(pokemonActionDTO.getSourceAttackId())).findAny();
        if (sourcePokemonAttackDTOOptional.isEmpty()) {
            throw new AttackNotFoundInAttackResources((pokemonActionDTO.getSourceAttackId()));
        }

        PokemonState sourcePokemonState = opponentPokemonStates.get(pokemonActionDTO.getSourcePokemonId());
        if (sourcePokemonState == null || sourcePokemonState.getStatus() != PokemonStatus.ACTIVE) { throw new ActivePokemonNotFoundException((pokemonActionDTO.getSourcePokemonId())); }

        PokemonState targetPokemonState = opponentPokemonStates.get(pokemonActionDTO.getTargetPokemonId());
        if (targetPokemonState == null || targetPokemonState.getStatus() != PokemonStatus.ACTIVE) { throw new ActivePokemonNotFoundException((pokemonActionDTO.getTargetPokemonId())); }

        AttackResultDTO attackResultDTO = new AttackResultDTO();

        if (targetPokemonState.getHealth() > 0) {
            targetPokemonState.receiveDamage(sourcePokemonAttackDTOOptional.get());
        }

        if (targetPokemonState.getHealth() <= 0) {
            targetPokemonState.markAsDefeated();
            long noOfActivePokemonsOfOpponent = opponentPokemonStates.values().stream().filter(pokemonState -> pokemonState.getStatus() == PokemonStatus.ACTIVE).count();

            if (noOfActivePokemonsOfOpponent == 0) {
                attackResultDTO.setBattleWinner(pokemonActionDTO.getSourcePlayerId());
            }
        }

        attackResultDTO.setUpdatedOpponentPokemonStateList(opponentPokemonStates);
        return attackResultDTO;
    }

    static void markBattleAsCompleted(Long winner, BattleState battleState) {
        battleState.setWinner(winner);
        battleState.setStatus(BattleStatus.COMPLETED);
    }
}
