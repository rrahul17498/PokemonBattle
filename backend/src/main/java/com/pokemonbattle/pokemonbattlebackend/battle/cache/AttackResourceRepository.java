package com.pokemonbattle.pokemonbattlebackend.battle.cache;

import com.pokemonbattle.pokemonbattlebackend.battle.BattleResourcesDTO;
import com.pokemonbattle.pokemonbattlebackend.redis.RedisStateRepository;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Repository
public class AttackResourceRepository extends RedisStateRepository {


    public AttackResourceRepository(RedisJSONClient redisJSONClient) {
        super(redisJSONClient);
    }

    public void save(BattleResourcesDTO battleResourcesDTO) {
        Optional<AttackResources> existingAttackState = this.findByRoom(battleResourcesDTO.roomId());

        if (existingAttackState.isPresent()) {
            return;
        }

        AttackResources attackResources = new AttackResources(battleResourcesDTO);
        this.createJSONBucket(CacheKeyUtil.getAttackStateKey(battleResourcesDTO.roomId()), attackResources, Duration.ofMinutes(30));
    }

    public Optional<AttackResources> findByRoom(String roomId) {
        return Optional.ofNullable(this.getBucketData(CacheKeyUtil.getAttackStateKey(roomId), AttackResources.class));
    }

    public void update(String roomId, AttackResources attackResources){
        this.updateBucketData(CacheKeyUtil.getBattleStateKey(roomId), attackResources);
    }

    public void delete(String roomId) {
        this.deleteBucketData(CacheKeyUtil.getAttackStateKey(roomId));
    }
}
