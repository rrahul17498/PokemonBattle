package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

public record BattleMessageDTO(
        Integer battleId,
        BattleStatus status,
        Long firstPlayerId,
        String firstPlayerName,
        Integer firstPlayerPokemons
        ) {
//    @Id
//    private ;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private BattleStatus status;
//
//    @JsonProperty("first_player")
//    @Column(name="first_player",nullable = false)
//    private Long firstPlayerId;
//
//    @JsonProperty("first_player_name")
//    @Column(name="first_player_name",nullable = false)
//    private String firstPlayerName;
//
//    @JsonProperty("first_player_pokemon")
//    @Column(name="first_player_pokemon")
//    private Integer firstPlayerPokemons;
//
//    @JsonProperty("second_player")
//    @Column(name="second_player")
//    private Long secondPlayerId;
//
//    @JsonProperty("second_player_name")
//    @Column(name="second_player_name",nullable = false)
//    private String secondPlayerName;
//
//    @JsonProperty("second_player_pokemon")
//    @Column(name="second_player_pokemon")
//    private Integer secondPlayerPokemons;
//
//    @JsonProperty("current_turn")
//    @Column(name = "current_turn",nullable = false)
//    private Integer currentTurn = 1;
//
//    @JsonProperty("battle_attacks_log")
//    @Column(name = "battle_attacks_log",nullable = false)
//    private List<Integer> battleAttacksLog = List.of();
//
//    private Integer winner;
//
//
//    static BattleMessageDTO fromUser(){
//        return new BattleMessageDTO();
//    }
}
