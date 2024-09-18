package com.pokemonbattle.pokemonbattlebackend.pokemon;

import java.util.List;


public class Pokemon {
    private Integer id;
    private String name;
//    private Types type;
//    private List<Attack> attacks;
//    private Theme theme;

    public Pokemon(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public enum Types {
        FIRE, WATER, GRASS,
    }

    public record Theme(
       String light,
       String dark
    ) {
    }


}
