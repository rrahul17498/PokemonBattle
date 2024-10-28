package com.pokemonbattle.pokemonbattlebackend.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.user.GuestUserDTO;

import java.util.List;

public record GuestResponseDTO(
        Long id,
        String name,
        @JsonProperty("owned_pokemons") List<Long> ownedPokemons,
        String token
) {

    static GuestResponseDTO from(GuestUserDTO guestUserDTO, String token) {
        return new GuestResponseDTO(
                guestUserDTO.id(),
                guestUserDTO.name(),
                guestUserDTO.ownedPokemons(),
                token
        );
    }
}
