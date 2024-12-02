package com.pokemonbattle.pokemonbattlebackend.pokemon;
import com.pokemonbattle.pokemonbattlebackend.exceptions.GlobalRestAPIErrorResponse;
import com.pokemonbattle.pokemonbattlebackend.pokemon.exceptions.PokemonNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
       this.pokemonService = pokemonService;
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


    @ExceptionHandler(PokemonNotFoundException.class)
    public ResponseEntity<GlobalRestAPIErrorResponse> handlePokemonNotFoundException (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GlobalRestAPIErrorResponse(
                e.getMessage()
        ));
    };

}
