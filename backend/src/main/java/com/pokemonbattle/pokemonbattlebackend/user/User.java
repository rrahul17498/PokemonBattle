package com.pokemonbattle.pokemonbattlebackend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "Users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String email;

    private String password;

    @JsonProperty("owned_pokemons")
    @Column(name = "owned_pokemons")
    private List<Long> ownedPokemons = List.of();

    private Integer rating;

    @Column(name = "is_guest")
    private Boolean isGuest;

    public User(GuestUserDTO guestUser) {
        this.name = guestUser.name();
        this.ownedPokemons = guestUser.ownedPokemons();
        this.isGuest = true;
    }
}
