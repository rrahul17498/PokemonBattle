package com.pokemonbattle.pokemonbattlebackend.pokemon;


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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }


//    public enum Types {
//        FIRE, WATER, GRASS,
//    }
//
//    public record Theme(
//       String light,
//       String dark
//    ) {
//    }


}
