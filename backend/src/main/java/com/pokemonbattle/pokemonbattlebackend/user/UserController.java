package com.pokemonbattle.pokemonbattlebackend.user;
import com.pokemonbattle.pokemonbattlebackend.exceptions.GlobalRestAPIErrorResponse;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<GlobalRestAPIErrorResponse> handleUserNotFoundException (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GlobalRestAPIErrorResponse(
                e.getMessage()
        ));
    };
}
