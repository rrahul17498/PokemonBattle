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
public class AttackStateRepository extends RedisStateRepository {


    public AttackStateRepository(RedisJSONClient redisJSONClient) {
        super(redisJSONClient);
    }

    public void createAndSaveAttackState(BattleResourcesDTO battleResourcesDTO) {
        AttackState attackState = new AttackState(battleResourcesDTO);
        this.createJSONBucket(RedisBattleKeyUtil.getAttackStateKey(battleResourcesDTO.roomId()), attackState, Duration.ofMinutes(30));
    }

    public AttackState getAttackStateByRoom(String roomId) {
        return this.getBucketData(RedisBattleKeyUtil.getAttackStateKey(roomId), AttackState.class);
    }

    public void updateAttackStateForRoom(String roomId, AttackState attackState){
        this.updateBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), attackState);
    }
}
