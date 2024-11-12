package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemonbattle.pokemonbattlebackend.battle.Battle;
import com.pokemonbattle.pokemonbattlebackend.battle.BattleStatus;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.user.UserWithPokemonsDTO;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("game-state")
public class BattleState implements Serializable {
    @Id
    private String roomId;
    private Integer battleId;
    private BattleStatus status;
    private Long firstPlayerId;
    private Long firstPlayerPokemon1Id;
    private Float firstPlayerPokemon1Health;
    private Long firstPlayerPokemon2Id;
    private Float firstPlayerPokemon2Health;
    private Long firstPlayerPokemon3Id;
    private Float firstPlayerPokemon3Health;
    private Long secondPlayerId;
    private Long secondPlayerPokemon1Id;
    private Float secondPlayerPokemon1Health;
    private Long secondPlayerPokemon2Id;
    private Float secondPlayerPokemon2Health;
    private Long secondPlayerPokemon3Id;
    private Float secondPlayerPokemon3Health;
    private Long winner;

}
