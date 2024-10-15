package com.pokemonbattle.pokemonbattlebackend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.NonNull;

import java.util.List;

public record GuestUserDTO(
        Long id,
        String name,
        @JsonProperty("owned_pokemons") List<Long> ownedPokemons
) {
        public static GuestUserDTO fromUser(User user) {
            return new GuestUserDTO(user.getId(), user.getName(),user.getOwnedPokemons());
        }
}
