package com.pokemonbattle.pokemonbattlebackend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @JsonProperty("owned_pokemons")
    @Column(name = "owned_pokemons")
    private List<Long> ownedPokemons = List.of();

    private Integer rating;
}
