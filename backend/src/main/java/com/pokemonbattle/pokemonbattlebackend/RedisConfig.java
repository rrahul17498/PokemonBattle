package com.pokemonbattle.pokemonbattlebackend;

import io.github.dengliming.redismodule.redisjson.client.RedisJSONClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedisConfig {

    @Value("${redis-json.host}")
    private String host;

    @Value("${redis-json.port}")
    private Integer port;

    @Bean
    public RedisJSONClient redisJSONClient() {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://127.0.0.1:" + this.port);
        return new RedisJSONClient(config);
    }
}
