package com.pokemonbattle.pokemonbattlebackend.pokemon;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.Attack;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
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

    @JsonManagedReference
    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attack> attacks;

}
