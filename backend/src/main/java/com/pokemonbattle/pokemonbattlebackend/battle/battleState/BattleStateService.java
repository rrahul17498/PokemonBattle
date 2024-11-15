package com.pokemonbattle.pokemonbattlebackend.battle.battleState;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.battle.socketHandler.BattleConnectionHandler;
import io.github.dengliming.redismodule.redisjson.RedisJSON;
import io.github.dengliming.redismodule.redisjson.args.SetArgs;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import io.github.dengliming.redismodule.redisjson.utils.GsonUtils;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BattleStateService {
    private final BattleConnectionHandler battleSocketHandler;
    private final RedisJSONClient redisJSONClient;

    public void createAndSaveBattleState(BattleResourcesDTO battleResourcesDTO) {
        RedisJSON redisJSON = redisJSONClient.getRedisJSON();
        RedissonClient redisson = redisJSONClient.getRedisson();

        BattleState createdBattleState = new BattleState(battleResourcesDTO);
        String battleStateKey = createdBattleState.getRoomId() + ":battle:state";
        redisJSON.set(battleStateKey, SetArgs.Builder.create(".", GsonUtils.toJson(createdBattleState)));
        redisson.getBucket(battleStateKey).expire(Duration.ofMinutes(30));

        AttackState attackState = new AttackState(battleResourcesDTO);
        String attackStateKey = createdBattleState.getRoomId() + ":attack:state";
        redisJSON.set(attackStateKey, SetArgs.Builder.create(".", GsonUtils.toJson(attackState)));
        redisson.getBucket(attackStateKey).expire(Duration.ofMinutes(30));

        this.battleSocketHandler.sendBattleStateToPlayers(createdBattleState);
    }


}
