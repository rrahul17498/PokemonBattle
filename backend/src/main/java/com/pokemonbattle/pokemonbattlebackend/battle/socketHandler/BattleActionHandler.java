package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.*;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.AttackStateNotFound;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.BattleStateNotFoundForRoom;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@Component
public class BattleActionHandler {

    private final SocketIOServer server;
    private final BattleStateRepository battleStateRepository;
    private final AttackResourceRepository attackResourceRepository;

    public BattleActionHandler(SocketIOServer server, BattleStateRepository battleStateRepository, AttackResourceRepository attackResourceRepository) {
        this.battleStateRepository =  battleStateRepository;
        this.attackResourceRepository = attackResourceRepository;
        this.server = server;
        this.server.addEventListener(BattleActionEvents.USER_ACTION.name(), UserActionDTO.class, this.executeUserAction());
        this.server.addEventListener(BattleActionEvents.POKEMON_ACTION.name(), PokemonActionDTO.class, this.executePokemonAction());
    }

    DataListener<UserActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            log.info("user action: {}", userAction);
            Optional<BattleState> existingBattleState = this.battleStateRepository.findByRoom(userAction.getRoomId());

            if (existingBattleState.isEmpty()) {
                this.server.getRoomOperations(userAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
                return;
            }

            if (userAction.getType().equals(UserActionTypes.CHOOSE_POKEMON.name())) {
                existingBattleState.get().updateActivePokemon(userAction.getPlayerId(), userAction.getPokemonId());
            } else if (userAction.getType().equals(UserActionTypes.WITHDRAW_POKEMON.name())) {
                existingBattleState.get().updateActivePokemon(userAction.getPlayerId(), null);
            }

            this.executeBattleStateUpdateForRoom(userAction.getRoomId(), existingBattleState.get());
            userAction.setSuccess(true);
            log.info("user action successful: {}", userAction);
            this.server.getRoomOperations(userAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }

    DataListener<PokemonActionDTO> executePokemonAction() {
        return (client, pokemonAction, ackRequest) -> {
            log.info("pokemon action: {}", pokemonAction);
            this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION.name(), pokemonAction);

            Optional<BattleState> existingBattleStateOptional = this.battleStateRepository.findByRoom(pokemonAction.getRoomId());
            if (existingBattleStateOptional.isEmpty()) {
                this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
                throw new BattleStateNotFoundForRoom(pokemonAction.getRoomId());
            }

            BattleState existingBattleState = existingBattleStateOptional.get();

            if (pokemonAction.getType().equals(PokemonActionTypes.ATTACK.name()) && existingBattleState.getFirstPlayerChosenPokemonId() != null && existingBattleState.getSecondPlayerChosenPokemonId() !=null) {
                  Optional<AttackResources> attackState = this.attackResourceRepository.findByRoom(pokemonAction.getRoomId());
                  if (attackState.isEmpty()) {
                      this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), pokemonAction);
                      throw new AttackStateNotFound(pokemonAction.getRoomId());
                  }


                  if (Objects.equals(pokemonAction.getSourcePlayerId(), existingBattleState.getFirstPlayerId()) && existingBattleState.getCurrentTurn().equals(existingBattleState.getFirstPlayerId())) {

                      AttackResultDTO attackResultDTO = BattleActionUtils.executeAttackAndUpdateOpponentPokemonsState(
                              existingBattleState.getSecondPlayerPokemonsStates(),
                              attackState.get().getFirstPlayerPokemonAttackResources(),
                              pokemonAction
                      );
                      existingBattleState.setSecondPlayerPokemonsStates(attackResultDTO.getUpdatedOpponentPokemonStateList());
                      existingBattleState.setCurrentTurn(existingBattleState.getSecondPlayerId());

                      if (attackResultDTO.getBattleWinner() != null) {
                          existingBattleState.markBattleAsCompleted(attackResultDTO.getBattleWinner());
                      }
                  } else if (Objects.equals(pokemonAction.getSourcePlayerId(), existingBattleState.getSecondPlayerId()) && existingBattleState.getCurrentTurn().equals(existingBattleState.getSecondPlayerId())) {

                      AttackResultDTO attackResultDTO = BattleActionUtils.executeAttackAndUpdateOpponentPokemonsState(
                              existingBattleStateOptional.get().getFirstPlayerPokemonsStates(),
                              attackState.get().getSecondPlayerPokemonAttackResources(),
                              pokemonAction
                      );
                      existingBattleState.setFirstPlayerPokemonsStates(attackResultDTO.getUpdatedOpponentPokemonStateList());
                      existingBattleState.setCurrentTurn(existingBattleState.getFirstPlayerId());

                      if (attackResultDTO.getBattleWinner() != null) {
                          existingBattleState.markBattleAsCompleted(attackResultDTO.getBattleWinner());
                      }
                  }

                this.executeBattleStateUpdateForRoom(pokemonAction.getRoomId(), existingBattleState);
                pokemonAction.setSuccess(true);
                log.info("pokemon action successful: {}", pokemonAction);
                this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
            }
        };

    }

    public void sendBattleStateToPlayers(BattleState battleState){
        this.server.getRoomOperations(battleState.getRoomId()).sendEvent(BattleActionEvents.BATTLE_STATE_UPDATE.name(), battleState);
    }

    void executeBattleStateUpdateForRoom(String roomId, BattleState battleState) {
        this.battleStateRepository.update(roomId, battleState);
        this.sendBattleStateToPlayers(battleState);
    }

}
