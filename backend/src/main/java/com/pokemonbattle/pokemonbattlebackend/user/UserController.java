package com.pokemonbattle.pokemonbattlebackend.user;
import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}/pokemons")
    List<Pokemon> getAllUserPokemons(@PathVariable Long id) {
        return this.userService.getAllUserPokemons(id);
    }

    @PostMapping("")
    void createUser(@RequestBody User user) {
        this.userService.createUser(user);
    }

    @PutMapping("/{id}")
    void updateUser(@PathVariable Long id, @RequestBody User user) {
        this.userService.updateUser(id, user);
    }

    @PostMapping("/guest")
    void createGuestUser(@RequestBody GuestUserDTO guestUserDTO) {
        this.userService.createGuestUser(guestUserDTO);
    }
    @GetMapping("/guest/{id}")
    GuestUserDTO getGuestUser(@PathVariable Long id) {
        return this.userService.getGuestUser(id);
    }
}
