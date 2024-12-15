package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.pokemonbattle.pokemonbattlebackend.battle.cache.*;
import com.pokemonbattle.pokemonbattlebackend.battle.exceptions.AttackStateNotFound;
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

            Optional<BattleState> existingBattleState = this.battleStateRepository.findByRoom(pokemonAction.getRoomId());
            if (existingBattleState.isEmpty()) {
                this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
                return;
            }

            if (pokemonAction.getType().equals(PokemonActionTypes.ATTACK.name())) {
                  Optional<AttackResources> attackState = this.attackResourceRepository.findByRoom(pokemonAction.getRoomId());
                  if (attackState.isEmpty()) {
                      this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), pokemonAction);
                      throw new AttackStateNotFound(pokemonAction.getRoomId());
                  }


                  if (Objects.equals(pokemonAction.getSourcePlayerId(), existingBattleState.get().getFirstPlayerId())) {
                      Map<Long, PokemonState> updatedSecondPlayerPokemonStateList = BattleActionUtils.executeAttackAndUpdateOpponentPokemonsState(
                              existingBattleState.get().getSecondPlayerPokemonsStates(),
                              existingBattleState.get().getFirstPlayerPokemonsStates(),
                              attackState.get().getFirstPlayerPokemonAttackResources(),
                              pokemonAction,
                              existingBattleState.get()
                      );
                      existingBattleState.get().setSecondPlayerPokemonsStates(updatedSecondPlayerPokemonStateList);
                  } else if (Objects.equals(pokemonAction.getSourcePlayerId(), existingBattleState.get().getSecondPlayerId())) {
                      Map<Long, PokemonState> updatedFirstPlayerPokemonStateList = BattleActionUtils.executeAttackAndUpdateOpponentPokemonsState(
                              existingBattleState.get().getFirstPlayerPokemonsStates(),
                              existingBattleState.get().getSecondPlayerPokemonsStates(),
                              attackState.get().getSecondPlayerPokemonAttackResources(),
                              pokemonAction,
                              existingBattleState.get()
                      );
                      existingBattleState.get().setFirstPlayerPokemonsStates(updatedFirstPlayerPokemonStateList);
                  }

                this.executeBattleStateUpdateForRoom(pokemonAction.getRoomId(), existingBattleState.get());
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
