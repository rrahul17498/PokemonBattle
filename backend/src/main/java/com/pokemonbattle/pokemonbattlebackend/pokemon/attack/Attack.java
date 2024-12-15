package com.pokemonbattle.pokemonbattlebackend.pokemon.attack;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Entity
@Table(name = "Attacks")
@Data
public class Attack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "pokemon_id", nullable = false)
    private Pokemon pokemon;

    @Column(nullable = false)
    private String name;

    @JsonProperty("media_src")
    @Column(name = "media_src", nullable = false)
    private String mediaSrc;

    @Column(nullable = false)
    private Integer power;

    @Column(nullable = false)
    private Integer accuracy;

    @JsonProperty("energy_consumed")
    @Column(name = "energy_consumed", nullable = false)
    private Integer energyConsumed;


    @Override
    public String toString() {
        return "Attack{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mediaSrc='" + mediaSrc + '\'' +
                ", power=" + power +
                ", accuracy=" + accuracy +
                ", energyConsumed=" + energyConsumed +
                '}';
    }

}
