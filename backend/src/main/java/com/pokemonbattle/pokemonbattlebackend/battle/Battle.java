package com.pokemonbattle.pokemonbattlebackend.battle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="battles")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Battle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("battle_id")
    @Column(name="battle_id")
    private Integer battleId;

    @JsonProperty("room_id")
    @Column(name="room_id")
    private String roomId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BattleStatus status;

    @JsonProperty("first_player_id")
    @Column(name="first_player_id",nullable = false)
    private Long firstPlayerId;

    @JsonProperty("first_player_name")
    @Column(name="first_player_name",nullable = false)
    private String firstPlayerName;

    @JsonProperty("second_player_id")
    @Column(name="second_player_id")
    private Long secondPlayerId;

    @JsonProperty("second_player_name")
    @Column(name="second_player_name")
    private String secondPlayerName;

    private Long winner;

}
