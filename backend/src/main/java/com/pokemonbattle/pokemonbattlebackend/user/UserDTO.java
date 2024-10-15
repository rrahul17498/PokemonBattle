package com.pokemonbattle.pokemonbattlebackend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;

import java.util.List;

public record UserDTO(
        Long id,
        String name,
        String email,
        @JsonProperty("owned_pokemons")
        List<Long> ownedPokemons,
        Integer rating
) {
}
