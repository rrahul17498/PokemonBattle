package com.pokemonbattle.pokemonbattlebackend.redis;

import io.github.dengliming.redismodule.redisjson.RedisJSON;
import io.github.dengliming.redismodule.redisjson.args.GetArgs;
import io.github.dengliming.redismodule.redisjson.args.SetArgs;
import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import io.github.dengliming.redismodule.redisjson.utils.GsonUtils;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.client.RedisException;
import org.springframework.stereotype.Repository;
import java.time.Duration;

@Repository
@Slf4j
public class RedisStateRepository {
    private final RedisJSON redisJSON;
    private final Redisson redissonClient;

    protected RedisStateRepository(RedisJSONClient redisJSONClient) {
        this.redisJSON = redisJSONClient.getRedisJSON();
        this.redissonClient = redisJSONClient.getRedisson();
    }

    protected void createJSONBucket(String bucketKey, Object dataObject, Duration expiryTime) {
        try {
            this.redisJSON.set(bucketKey, SetArgs.Builder.create(".", GsonUtils.toJson(dataObject)));
            this.redissonClient.getBucket(bucketKey).expire(expiryTime);
        } catch(RedisException e) {
            log.error("Failed to create JSON bucket for key: {}", bucketKey);
        }

    }

    protected <T> T getBucketData(String bucketKey, Class<T> mapClass){
        try {
            return this.redisJSON.get(bucketKey, mapClass, new GetArgs().path("."));
        } catch(RedisException e) {
            log.error("Failed to get JSON bucket for key: {}", bucketKey);
            return null;
        }

    }

    protected void updateBucketData(String bucketKey, Object dataObject){
        try {
            this.redisJSON.set(bucketKey, SetArgs.Builder.create(".", GsonUtils.toJson(dataObject)));
        } catch(RedisException e) {
            log.error("Failed to update JSON bucket for key: {}", bucketKey);
        }
    }
}
