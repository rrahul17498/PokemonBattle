package com.pokemonbattle.pokemonbattlebackend.auth;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record GuestRequestDTO(
        String name,
        @JsonProperty("owned_pokemons") List<Long> ownedPokemons
) {
}
