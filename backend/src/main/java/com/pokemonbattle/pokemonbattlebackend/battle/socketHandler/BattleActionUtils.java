package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.pokemonbattle.pokemonbattlebackend.battle.cache.AttackResources;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.BattleState;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.PokemonState;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.AttackNotFoundInAttackResources;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.ActivePokemonNotFoundException;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackDTO;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;

public class BattleActionUtils {

    static void executeAttack(BattleState battleState, AttackResources attackResources, PokemonActionDTO pokemonActionDTO) {
        AttackResultDTO attackResultDTO = new AttackResultDTO();

        if (pokemonActionDTO.getSourcePlayerId().equals(battleState.getFirstPlayerId()) && battleState.getCurrentTurn().equals(battleState.getFirstPlayerId())) {
                BattleActionUtils.executeTargetPokemonStateDamage(
                        battleState, battleState.getFirstPlayerPokemonsStates(), attackResources.getFirstPlayerPokemonAttackResources(),
                        battleState.getSecondPlayerPokemonsStates(), battleState::setSecondPlayerPokemonsStates,
                        battleState.getSecondPlayerId(), pokemonActionDTO, attackResultDTO
                );
        } else if (pokemonActionDTO.getSourcePlayerId().equals(battleState.getSecondPlayerId()) && battleState.getCurrentTurn().equals(battleState.getSecondPlayerId())) {
                BattleActionUtils.executeTargetPokemonStateDamage(
                        battleState, battleState.getSecondPlayerPokemonsStates(), attackResources.getSecondPlayerPokemonAttackResources(),
                        battleState.getFirstPlayerPokemonsStates(), battleState::setFirstPlayerPokemonsStates,
                        battleState.getFirstPlayerId(), pokemonActionDTO, attackResultDTO
                );
        }

    }

    static void executeTargetPokemonStateDamage(
            BattleState battleState, Map<Long, PokemonState> sourcePokemonStates, List<AttackDTO> sourceUserPokemonsAttackList,
            Map<Long, PokemonState> targetPokemonStates, Consumer<Map<Long, PokemonState>> updateTargetPokemonState,
            Long nextTurnPlayerId, PokemonActionDTO pokemonActionDTO, AttackResultDTO attackResultDTO
    ) {
            PokemonState sourcePokemonState = sourcePokemonStates.get(pokemonActionDTO.getSourcePokemonId());
            if (sourcePokemonState == null || sourcePokemonState.getStatus() != PokemonStatus.ACTIVE) {
                throw new ActivePokemonNotFoundException((pokemonActionDTO.getSourcePokemonId()));
            }
            PokemonState targetPokemonState = targetPokemonStates.get(pokemonActionDTO.getTargetPokemonId());
            if (targetPokemonState == null || targetPokemonState.getStatus() != PokemonStatus.ACTIVE) {
                throw new ActivePokemonNotFoundException((pokemonActionDTO.getTargetPokemonId()));
            }
            Optional<AttackDTO> sourcePokemonAttackResult = sourceUserPokemonsAttackList.stream().filter((item) -> item.getId().equals(pokemonActionDTO.getSourceAttackId())).findAny();
            if (sourcePokemonAttackResult.isEmpty()) {
                throw new AttackNotFoundInAttackResources((pokemonActionDTO.getSourceAttackId()));
            }


            if (targetPokemonState.getHealth() > 0) {
                targetPokemonState.receiveDamage(sourcePokemonAttackResult.get());
            }
            if (targetPokemonState.getHealth() <= 0) {
                    targetPokemonState.markAsDefeated();
                    long noOfActivePokemonsOfOpponent = targetPokemonStates.values().stream().filter(pokemonState -> pokemonState.getStatus() == PokemonStatus.ACTIVE).count();
                    if (noOfActivePokemonsOfOpponent == 0) {
                        battleState.markBattleAsCompleted(pokemonActionDTO.getSourcePlayerId());
                    }
            }
            updateTargetPokemonState.accept(targetPokemonStates);
            battleState.setCurrentTurn(nextTurnPlayerId);
    }

}
