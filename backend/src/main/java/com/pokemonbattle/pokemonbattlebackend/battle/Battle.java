package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="Battles")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Battle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BattleStatus status;

    @JsonProperty("first_player")
    @Column(name="first_player",nullable = false)
    private Integer firstPlayerId;

    @JsonProperty("first_player_pokemon")
    @Column(name="first_player_pokemon")
    private Integer firstPlayerPokemon;

    @JsonProperty("second_player")
    @Column(name="second_player")
    private Integer secondPlayerId;

    @JsonProperty("second_player_pokemon")
    @Column(name="second_player_pokemon")
    private Integer secondPlayerPokemon;

    @JsonProperty("current_turn")
    @Column(name = "current_turn",nullable = false)
    private Integer currentTurn = 1;

    @JsonProperty("battle_attacks_log")
    @Column(name = "battle_attacks_log",nullable = false)
    private List<Integer> battleAttacksLog = List.of();

    private Integer winner;
    
}
