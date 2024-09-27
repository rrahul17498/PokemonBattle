package com.pokemonbattle.pokemonbattlebackend.user;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("")
    List<User> getAll() {
        return this.userRepository.findAll();
    }

    @PostMapping("/create")
    void create(@RequestBody User user) {
        this.userRepository.save(user);
    }
}
