package com.pokemonbattle.pokemonbattlebackend.battle.cache;

public class CacheKeyUtil {
    private static final String battleKeyPrefix = "battle";
    private static final String battleStateSuffix = "state";
    private static final String attackStateSuffix = "attack";

    public static String getBattleStateKey(String roomId) {
        return String.format("%s:%s:%s", battleKeyPrefix, roomId, battleStateSuffix);
    }

    public static String getAttackStateKey(String roomId) {
        return String.format("%s:%s:%s", battleKeyPrefix, roomId, attackStateSuffix);
    }
}
