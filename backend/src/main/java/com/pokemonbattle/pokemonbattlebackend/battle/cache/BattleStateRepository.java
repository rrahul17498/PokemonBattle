package com.pokemonbattle.pokemonbattlebackend.battle.gameManagement;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.redis.RedisStateRepository;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Repository
public class BattleStateRepository extends RedisStateRepository {

    public BattleStateRepository(RedisJSONClient redisJSONClient) {
        super(redisJSONClient);
    }

    public BattleState save(BattleResourcesDTO battleResourcesDTO) {
        Optional<BattleState> existingBattleState = this.getBattleStateByRoom(battleResourcesDTO.roomId());

        if (existingBattleState.isPresent()) {
            return existingBattleState.get();
        }

        BattleState createdBattleState = new BattleState(battleResourcesDTO);
        this.createJSONBucket(RedisBattleKeyUtil.getBattleStateKey(createdBattleState.getRoomId()), createdBattleState, Duration.ofMinutes(30));
        return createdBattleState;
    }

    public Optional<BattleState> getBattleStateByRoom(String roomId) {
        return Optional.ofNullable(this.getBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), BattleState.class));
    }

    public void updateBattleStateForRoom(String roomId, BattleState battleState){
        this.updateBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), battleState);
    }
}
