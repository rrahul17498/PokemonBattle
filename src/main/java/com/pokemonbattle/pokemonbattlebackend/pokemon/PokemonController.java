package com.pokemonbattle.pokemonbattlebackend.pokemon;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PokemonController {

    @GetMapping("/pokemon")
    String getPokemonDetails() {
        return "First Response !";
    }

}
