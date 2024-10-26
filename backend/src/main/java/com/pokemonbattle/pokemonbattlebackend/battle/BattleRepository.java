package com.pokemonbattle.pokemonbattlebackend.battle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BattleRepository extends JpaRepository<Battle,Integer>{
    List<Battle> findByStatus(BattleStatus status);
}
