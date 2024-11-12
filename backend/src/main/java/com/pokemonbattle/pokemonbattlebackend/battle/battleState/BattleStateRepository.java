package com.pokemonbattle.pokemonbattlebackend.battle.battleState;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleStateRepository extends CrudRepository<BattleState, String> {
}
