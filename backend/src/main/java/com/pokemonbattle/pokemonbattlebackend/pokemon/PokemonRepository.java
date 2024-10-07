package com.pokemonbattle.pokemonbattlebackend.pokemon;

import jakarta.annotation.PostConstruct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
}
