package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.user.User;
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

    @JsonProperty("first_player_id")
    @Column(name="first_player_id",nullable = false)
    private Long firstPlayerId;

    @JsonProperty("second_player_id")
    @Column(name="second_player_id")
    private Long secondPlayerId;

    private Long winner;

    @JsonProperty("battle_attacks_log")
    @Column(name = "battle_attacks_log",nullable = false)
    private List<Integer> battleMessagesLog = List.of();

}
