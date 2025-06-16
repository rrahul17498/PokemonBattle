package com.pokemonbattle.pokemonbattlebackend.pokemon.attack;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

public record AttackWithMediaDTO(
         Pokemon pokemon,
         @NotBlank(message = "Attack name is required")
         String name,
         @NotBlank(message = "Media is required")
         @JsonProperty("media_src")
         String mediaSrc,
         @NotNull(message = "Power is required")
         Integer power,
         @NotNull(message = "Accuracy is required")
         Integer accuracy,
         @NotNull(message = "Energy consumed is required")
         @JsonProperty("energy_consumed")
         Integer energyConsumed,
         @NotBlank(message = "Attack alignment is required")
         @Enumerated(EnumType.STRING)
         @JsonProperty("attack_alignment")
         AttackAlignment attackAlignment
) {

    public static Attack createAttackEntityToSave(Pokemon pokemon, AttackWithMediaDTO attackWithMediaDTO){
        Attack attack = new Attack();
        attack.setPokemon(pokemon);
        attack.setName(attackWithMediaDTO.name());
        attack.setMediaSrc(attackWithMediaDTO.mediaSrc());
        attack.setPower(attackWithMediaDTO.power());
        attack.setAccuracy(attackWithMediaDTO.accuracy());
        attack.setEnergyConsumed(attackWithMediaDTO.energyConsumed());
        attack.setAttackAlignment(attackWithMediaDTO.attackAlignment());

        return attack;
    }

}
