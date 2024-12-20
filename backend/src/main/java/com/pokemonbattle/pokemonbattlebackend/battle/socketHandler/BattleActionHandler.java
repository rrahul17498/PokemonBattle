package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleRepository;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleService;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
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
    private final BattleService battleService;
    private final BattleStateHandler battleStateHandler;

    public BattleActionHandler(
            BattleStateRepository battleStateRepository,
            BattleStateHandler battleStateHandler,
            AttackResourceRepository attackResourceRepository,
            BattleService battleService,
            SocketIOServer server
    ) {
        this.battleStateRepository =  battleStateRepository;
        this.battleStateHandler = battleStateHandler;
        this.attackResourceRepository = attackResourceRepository;
        this.battleService = battleService;
        this.server = server;
        this.server.addEventListener(BattleActionEvents.USER_ACTION.name(), UserActionDTO.class, this.executeUserAction());
        this.server.addEventListener(BattleActionEvents.POKEMON_ACTION.name(), PokemonActionDTO.class, this.executePokemonAction());
    }

    DataListener<UserActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            log.info("user action: {}", userAction);
            Optional<BattleState> battleStateResult = this.battleStateRepository.findByRoom(userAction.getRoomId());
            if (battleStateResult.isEmpty()) {
                this.server.getRoomOperations(userAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
                return;
            }
            BattleState battleState = battleStateResult.get();
            if (userAction.getType().equals(UserActionTypes.CHOOSE_POKEMON.name())) {
                battleState.updateActivePokemon(userAction.getPlayerId(), userAction.getPokemonId());
            } else if (userAction.getType().equals(UserActionTypes.WITHDRAW_POKEMON.name())) {
                battleState.updateActivePokemon(userAction.getPlayerId(), null);
            }
            this.battleStateRepository.update(userAction.getRoomId(), battleState);
            this.battleStateHandler.sendBattleStateToPlayers(battleState);
            userAction.setSuccess(true);
            log.info("user action successful: {}", userAction);
            this.server.getRoomOperations(userAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }

    DataListener<PokemonActionDTO> executePokemonAction() {
        return (client, pokemonAction, ackRequest) -> {
            log.info("pokemon action: {}", pokemonAction);
            this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION.name(), pokemonAction);

            Optional<BattleState> battleStateResult = this.battleStateRepository.findByRoom(pokemonAction.getRoomId());
            if (battleStateResult.isEmpty()) {
                    pokemonAction.setSuccess(false);
                    this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
                    throw new BattleStateNotFoundForRoom(pokemonAction.getRoomId());
            }

            BattleState battleState = battleStateResult.get();
            if (
                    pokemonAction.getType().equals(PokemonActionTypes.ATTACK.name())
                    && battleState.getFirstPlayerChosenPokemonId() != null
                    && battleState.getSecondPlayerChosenPokemonId() != null
            ) {
                      Optional<AttackResources> attackResourcesResult = this.attackResourceRepository.findByRoom(pokemonAction.getRoomId());
                      if (attackResourcesResult.isEmpty()) {
                          this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), pokemonAction);
                          throw new AttackStateNotFound(pokemonAction.getRoomId());
                      }


                      AttackResources attackResources = attackResourcesResult.get();
                      BattleActionUtils.executeAttack(battleState, attackResources, pokemonAction);
                      this.battleStateRepository.update(pokemonAction.getRoomId(), battleState);
                      this.battleStateHandler.sendBattleStateToPlayers(battleState);
                      if (battleState.getStatus().equals(BattleStatus.COMPLETED)) {
                            this.battleService.markBattleAsCompleted(battleState.getBattleId(), battleState.getWinner());
                            this.battleStateRepository.delete(pokemonAction.getRoomId());
                            this.attackResourceRepository.delete(pokemonAction.getRoomId());
                      }
                      pokemonAction.setSuccess(true);
                      this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
                      log.info("pokemon action successful: {}", pokemonAction);
            }
        };
    }

}
