package com.pokemonbattle.pokemonbattlebackend.pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackService;
import com.pokemonbattle.pokemonbattlebackend.pokemon.attack.AttackWithMediaDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;
    private final AttackService attackService;

    public PokemonController(PokemonService pokemonService, AttackService attackService) {
       this.pokemonService = pokemonService;
       this.attackService = attackService;
    }

    @GetMapping("")
    List<Pokemon> getAllPokemons() {
        return this.pokemonService.getAllPokemons();
    }

    @GetMapping("/{id}")
    Pokemon getPokemonById(@PathVariable Long id) {
        return this.pokemonService.getPokemonById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    void createPokemon(@RequestBody Pokemon pokemon) {
        this.pokemonService.createPokemon(pokemon);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void updatePokemon( @PathVariable Long id, @RequestBody Pokemon pokemon) {
        this.pokemonService.updatePokemon(id, pokemon);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void deletePokemon(@PathVariable Long id) {
        this.pokemonService.deletePokemon(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{pokemonId}/attack/create")
    void createAttacks(@PathVariable Long pokemonId, @RequestBody AttackWithMediaDTO attackWithMediaDTO) {
        this.attackService.createAttack(pokemonId, attackWithMediaDTO);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{pokemonId}/attack/{id}")
    void deleteAttack(@PathVariable Long id) {
        this.attackService.deleteAttack(id);
    }

}
