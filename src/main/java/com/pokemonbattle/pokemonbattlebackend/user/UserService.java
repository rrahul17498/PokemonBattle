package com.pokemonbattle.pokemonbattlebackend.user;

import com.pokemonbattle.pokemonbattlebackend.pokemon.Pokemon;
import com.pokemonbattle.pokemonbattlebackend.pokemon.PokemonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;

    public UserService(
            UserRepository userRepository,
            PokemonRepository pokemonRepository
    ) {
        this.userRepository = userRepository;
        this.pokemonRepository = pokemonRepository;
    }

    List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    List<Pokemon> getAllUserPokemons(Long userId) {
        Optional<User> existingUser = this.userRepository.findById(userId);

        if (existingUser.isEmpty()) {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return this.pokemonRepository.findAllById(existingUser.get().getOwnedPokemons());
    }

    void createUser(User user) {
        this.userRepository.save(user);
    }

    void updateUser(Long id, User user) {

        Optional<User> existingUser = this.userRepository.findById(id);

        if (existingUser.isEmpty()) {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        User newUser = existingUser.get();
        newUser.setName(user.getName());
        newUser.setPassword(user.getPassword());
        newUser.setOwnedPokemons(user.getOwnedPokemons());
        newUser.setRating(user.getRating());

        System.out.println("User-details: " + user.getOwnedPokemons());

        this.userRepository.save(newUser);
    }

}
