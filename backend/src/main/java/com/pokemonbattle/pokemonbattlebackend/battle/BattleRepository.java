package com.pokemonbattle.pokemonbattlebackend.battle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BattleRepository extends JpaRepository<Battle,Integer>{
    List<BattlesToConnectDTO> findByStatus(BattleStatus status);

    @Query(value = "SELECT * FROM battles b WHERE (b.first_player_id = :userId OR b.second_player_id = :userId) AND b.status IN :activeStatuses", nativeQuery = true)
    Optional<Battle> findActiveBattle(@Param("userId") Long userId, @Param("activeStatuses") List<String> activeStatuses);
}
