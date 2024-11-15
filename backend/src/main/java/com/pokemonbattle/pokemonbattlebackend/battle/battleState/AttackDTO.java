package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.Attack;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AttackDTO {
    private Long id;
    private Long pokemonId;
    private String name;
    private Integer power;
    private Integer accuracy;
    private Integer energyConsumed;

    public AttackDTO(Long pokemonId, Attack attack) {
        this.id = attack.getId();
        this.pokemonId = pokemonId;
        this.name = attack.getName();
        this.power = attack.getPower();
        this.accuracy = attack.getAccuracy();
        this.energyConsumed = attack.getEnergyConsumed();
    }

    public static List<AttackDTO> from(Long pokemonId, List<Attack> attacks) {
        List<AttackDTO> attackDTOS = new ArrayList<>();
        for (Attack attack: attacks) {
            attackDTOS.add(new AttackDTO(pokemonId, attack));
        }
        return attackDTOS;
    }
}
