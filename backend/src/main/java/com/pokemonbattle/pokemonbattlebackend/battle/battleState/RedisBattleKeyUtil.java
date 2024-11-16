package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

public class RedisBattleKeyUtil {
    private static final String battleKeyPrefix = "battle";
    private static final String battleStateSuffix = "state";
    private static final String attackStateSuffix = "attack";


    public static String getBattleStateKey(String roomId) {
        return battleKeyPrefix + roomId + battleStateSuffix;
    }

    public static String getAttackStateKey(String roomId) {
        return battleKeyPrefix + roomId + attackStateSuffix;
    }
}
