package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.redis.RedisStateRepository;
import io.github.dengliming.redismodule.redisjson.RedisJSON;
import io.github.dengliming.redismodule.redisjson.args.SetArgs;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import io.github.dengliming.redismodule.redisjson.utils.GsonUtils;
import org.redisson.Redisson;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@Repository
public class BattleStateRepository extends RedisStateRepository {

    public BattleStateRepository(RedisJSONClient redisJSONClient) {
        super(redisJSONClient);
    }

    public BattleState createAndSaveBattleState(BattleResourcesDTO battleResourcesDTO) {
        BattleState createdBattleState = new BattleState(battleResourcesDTO);
        this.createJSONBucket(RedisBattleKeyUtil.getAttackStateKey(createdBattleState.getRoomId()), createdBattleState, Duration.ofMinutes(30));
        return createdBattleState;
    }

    public BattleState getBattleStateByRoom(String roomId) {
        return this.getBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), BattleState.class);
    }

    public void updateBattleStateForRoom(String roomId, BattleState battleState){
        this.updateBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), battleState);
    }
}
