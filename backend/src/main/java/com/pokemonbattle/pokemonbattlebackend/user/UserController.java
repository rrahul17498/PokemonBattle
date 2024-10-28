package com.pokemonbattle.pokemonbattlebackend.user;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("")
    List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}/pokemons")
    List<Pokemon> getAllUserPokemons(@PathVariable Long id) {
        return this.userService.getAllUserPokemons(id);
    }

    @GetMapping("/guest/{id}")
    GuestUserDTO getGuestUser(@PathVariable Long id) {
        return this.userService.getGuestUser(id);
    }
}
