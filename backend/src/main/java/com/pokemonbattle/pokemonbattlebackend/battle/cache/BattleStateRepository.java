package com.pokemonbattle.pokemonbattlebackend.battle.cache;

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
        Optional<BattleState> existingBattleState = this.findByRoom(battleResourcesDTO.roomId());

        if (existingBattleState.isPresent()) {
            return existingBattleState.get();
        }

        BattleState createdBattleState = BattleState.create(battleResourcesDTO);
        this.createJSONBucket(CacheKeyUtil.getBattleStateKey(createdBattleState.getRoomId()), createdBattleState, Duration.ofMinutes(30));
        return createdBattleState;
    }

    public Optional<BattleState> findByRoom(String roomId) {
        return Optional.ofNullable(this.getBucketData(CacheKeyUtil.getBattleStateKey(roomId), BattleState.class));
    }

    public void update(String roomId, BattleState battleState){
        this.updateBucketData(CacheKeyUtil.getBattleStateKey(roomId), battleState);
    }

    public void delete(String roomId) {
        this.deleteBucketData(CacheKeyUtil.getBattleStateKey(roomId));
    }
}
