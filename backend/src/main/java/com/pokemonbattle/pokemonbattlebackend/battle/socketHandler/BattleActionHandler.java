package com.pokemonbattle.pokemonbattlebackend.battle.socketHandler;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.pokemonbattle.pokemonbattlebackend.battle.battleState.*;
import io.github.dengliming.redismodule.redisjson.RedisJSON;
import io.github.dengliming.redismodule.redisjson.args.GetArgs;
import io.github.dengliming.redismodule.redisjson.args.SetArgs;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import io.github.dengliming.redismodule.redisjson.utils.GsonUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Objects;


@Component
public class BattleActionHandler {

    private final SocketIOServer server;
    private final RedisJSON redisJSON;

    public BattleActionHandler(SocketIOServer server, RedisJSONClient redisJSONClient) {
        this.redisJSON = redisJSONClient.getRedisJSON();
        this.server = server;
        this.server.addEventListener(BattleActionEvents.USER_ACTION.name(), BattleActionDTO.class, this.executeUserAction());
        this.server.addEventListener(BattleActionEvents.POKEMON_ACTION.name(), PokemonActionDTO.class, this.executePokemonAction());
    }

    DataListener<BattleActionDTO> executeUserAction() {
        return (client, userAction, ackRequest) -> {
            this.server.getRoomOperations(userAction.roomId()).sendEvent(BattleActionEvents.USER_ACTION_RESULT.name(), userAction);
        };
    }

    DataListener<PokemonActionDTO> executePokemonAction() {
        return (client, pokemonAction, ackRequest) -> {
            this.server.getRoomOperations(pokemonAction.roomId()).sendEvent(BattleActionEvents.POKEMON_ACTION_RESULT.name(), pokemonAction);
            String battleStateKey = RedisBattleKeyUtil.getBattleStateKey(pokemonAction.roomId());
            BattleState battleState = redisJSON.get(battleStateKey, BattleState.class, new GetArgs().path("."));

            if (pokemonAction.type().equals(PokemonActionTypes.ATTACK.name())) {
                  String attackStateKey = RedisBattleKeyUtil.getAttackStateKey(pokemonAction.roomId());
                  AttackState attackState = redisJSON.get(attackStateKey,AttackState.class, new GetArgs());

                  if (Objects.equals(pokemonAction.playerId(), battleState.getFirstPlayerId())) {
                      List<PokemonState> updatedSecondPlayerPokemonStateList = this.executePokemonAttack(
                              battleState.getSecondPlayerPokemonsState(),
                              attackState.getSecondPlayerPokemonAttackList(),
                              pokemonAction
                      );

                    battleState.setSecondPlayerPokemonsState(updatedSecondPlayerPokemonStateList);
                    redisJSON.set(battleStateKey, SetArgs.Builder.create(".", GsonUtils.toJson(battleState)));
                    this.server.getRoomOperations(pokemonAction.roomId()).sendEvent(BattleActionEvents.BATTLE_STATE_UPDATE.name(), battleState);
                    return;
                  }

                List<PokemonState> updatedFirstPlayerPokemonStateList = this.executePokemonAttack(
                        battleState.getFirstPlayerPokemonsState(),
                        attackState.getFirstPlayerPokemonAttackList(),
                        pokemonAction
                );

                battleState.setFirstPlayerPokemonsState(updatedFirstPlayerPokemonStateList);
                redisJSON.set(battleStateKey, SetArgs.Builder.create(".", GsonUtils.toJson(battleState)));
                this.server.getRoomOperations(pokemonAction.roomId()).sendEvent(BattleActionEvents.BATTLE_STATE_UPDATE.name(), battleState);
            }
        };

    }

    List<PokemonState> executePokemonAttack(List<PokemonState> pokemonStateList, List<AttackDTO> attackDTOList, PokemonActionDTO pokemonActionDTO) {
      PokemonState attackedPokemonState = pokemonStateList.stream().filter((item) -> item.getId().equals(pokemonActionDTO.pokemonId())).findAny().orElse(null);
      AttackDTO attackDTO = attackDTOList.stream().filter((item) -> item.getId().equals(pokemonActionDTO.payload())).findAny().orElse(null);

      if (attackedPokemonState == null || attackDTO == null) {
          return null;
      }

      for (PokemonState pokemonState: pokemonStateList) {
          if (pokemonState.getId().equals(attackDTO.getPokemonId())) {
              // ATTACK HEALTH LOGIC TO BE UPDATED
              Float updatedAttackedPokemonHealth = clampHealthValue(pokemonState.getHealth() - ((float) attackDTO.getPower()/100.0F));
              pokemonState.setHealth(updatedAttackedPokemonHealth);
              break;
          }
      }

      return pokemonStateList;
    }

    Float clampHealthValue(Float value) {
        DecimalFormat decimalFormat =  new DecimalFormat("0.00");
        return (Math.max(0.0F, Math.min(100.0F, value)));
    }
}
