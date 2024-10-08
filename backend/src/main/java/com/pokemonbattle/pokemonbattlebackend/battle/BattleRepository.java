package com.pokemonbattle.pokemonbattlebackend.battle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleRepository extends JpaRepository<Battle,Integer>{
}
