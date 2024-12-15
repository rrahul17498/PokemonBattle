package com.pokemonbattle.pokemonbattlebackend.battle.gameManagement;

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

    public void loadAttackState(BattleResourcesDTO battleResourcesDTO) {
        Optional<AttackResources> existingAttackState = this.getAttackStateByRoom(battleResourcesDTO.roomId());

        if (existingAttackState.isPresent()) {
            return;
        }

        AttackResources attackResources = new AttackResources(battleResourcesDTO);
        this.createJSONBucket(RedisBattleKeyUtil.getAttackStateKey(battleResourcesDTO.roomId()), attackResources, Duration.ofMinutes(30));
    }

    public Optional<AttackResources> getAttackStateByRoom(String roomId) {
        return Optional.ofNullable(this.getBucketData(RedisBattleKeyUtil.getAttackStateKey(roomId), AttackResources.class));
    }

    public void updateAttackStateForRoom(String roomId, AttackResources attackResources){
        this.updateBucketData(RedisBattleKeyUtil.getBattleStateKey(roomId), attackResources);
    }
}
