package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.pokemonbattle.pokemonbattlebackend.battle.battleState.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Component
public class BattleActionHandler {

    private final SocketIOServer server;
    private final BattleStateRepository battleStateRepository;
    private final AttackStateRepository attackStateRepository;

    public BattleActionHandler(SocketIOServer server, BattleStateRepository battleStateRepository, AttackStateRepository attackStateRepository) {
        this.battleStateRepository =  battleStateRepository;
        this.attackStateRepository = attackStateRepository;
        this.server = server;
        this.server.addEventListener(BattleActionEvents.USER_ACTION.name(), UserActionDTO.class, this.executeUserAction());
        this.server.addEventListener(BattleActionEvents.POKEMON_ACTION.name(), PokemonActionDTO.class, this.executePokemonAction());
    }

    public void sendBattleStateToPlayers(BattleState battleState){
        this.server.getRoomOperations(battleState.getRoomId()).sendEvent(BattleActionEvents.BATTLE_STATE_UPDATE.name(), battleState);
    }

    void executeBattleStateUpdateForRoom(String roomId, BattleState battleState) {
        this.battleStateRepository.updateBattleStateForRoom(roomId, battleState);
        this.sendBattleStateToPlayers(battleState);
    }

    DataListener<UserActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            Optional<BattleState> existingBattleState = this.battleStateRepository.getBattleStateByRoom(userAction.getRoomId());

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
            this.server.getRoomOperations(userAction.getRoomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }

    DataListener<PokemonActionDTO> executePokemonAction() {
        return (client, pokemonAction, ackRequest) -> {
            Optional<BattleState> existingBattleState = this.battleStateRepository.getBattleStateByRoom(pokemonAction.getRoomId());

            if (existingBattleState.isEmpty()) {
                this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
                return;
            }

            if (pokemonAction.getType().equals(PokemonActionTypes.ATTACK.name())) {
                  AttackState attackState = this.attackStateRepository.getAttackStateByRoom(RedisBattleKeyUtil.getAttackStateKey(pokemonAction.getRoomId()));

                  if (Objects.equals(pokemonAction.getSourcePokemonId(), existingBattleState.get().getFirstPlayerId())) {
                      List<PokemonState> updatedSecondPlayerPokemonStateList = this.executePokemonAttack(
                              existingBattleState.get().getSecondPlayerPokemonsState(),
                              attackState.getSecondPlayerPokemonAttackList(),
                              pokemonAction
                      );

                    existingBattleState.get().setSecondPlayerPokemonsState(updatedSecondPlayerPokemonStateList);
                  } else if (Objects.equals(pokemonAction.getSourcePokemonId(), existingBattleState.get().getSecondPlayerId())) {
                      List<PokemonState> updatedFirstPlayerPokemonStateList = this.executePokemonAttack(
                              existingBattleState.get().getFirstPlayerPokemonsState(),
                              attackState.getFirstPlayerPokemonAttackList(),
                              pokemonAction
                      );


                      existingBattleState.get().setFirstPlayerPokemonsState(updatedFirstPlayerPokemonStateList);
                  }

                this.executeBattleStateUpdateForRoom(pokemonAction.getRoomId(), existingBattleState.get());
                this.server.getRoomOperations(pokemonAction.getRoomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
            }
        };

    }

    List<PokemonState> executePokemonAttack(List<PokemonState> pokemonStateList, List<AttackDTO> attackDTOList, PokemonActionDTO pokemonActionDTO) {
      AttackDTO attackDTO = attackDTOList.stream().filter((item) -> item.getId().equals(pokemonActionDTO.getSourceAttackId())).findAny().orElse(null);

      if (attackDTO == null) {
          return null;
      }
      pokemonStateList = pokemonStateList.stream().map((pokemonState) -> {
          if (pokemonState.getId().equals(pokemonActionDTO.getTargetPokemonId()) && pokemonState.getHealth() > 0) {
              pokemonState.receiveDamage(attackDTO);
          }
          return pokemonState;
      }).toList();

      return pokemonStateList;
    }

    Integer clampHealthValue(Integer health) {
        return (Math.max(0, Math.min(100, health)));
    }

}
