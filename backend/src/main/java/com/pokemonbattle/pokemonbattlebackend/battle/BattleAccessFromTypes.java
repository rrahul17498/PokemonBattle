package com.pokemonbattle.pokemonbattlebackend.battle;

import lombok.Getter;

@Getter
public enum BattleAccessFromTypes {
    BATTLE("battle"),
    USER("user"),
    ROOM("room");

    private final String type;

    BattleAccessFromTypes(String type) {
        this.type = type;
    }

}
