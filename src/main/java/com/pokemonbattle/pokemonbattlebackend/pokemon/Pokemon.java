package com.pokemonbattle.pokemonbattlebackend.pokemon;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Pokemons")
@Data
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private PokemonAttributes type;

    @Column(nullable = false)
    private String image;

    private String theme_light;

    private String theme_dark;


    public Pokemon(){

    }

    public Pokemon(Long id, String name, PokemonAttributes type, String image) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
    }

}
