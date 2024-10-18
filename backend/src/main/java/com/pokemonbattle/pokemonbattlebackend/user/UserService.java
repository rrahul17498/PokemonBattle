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

    public UserWithPokemons getUserWithPokemons(Long userId) {
        Optional<User> existingUser = this.userRepository.findById(userId);

        if (existingUser.isEmpty()) {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        User user = existingUser.get();

        return new UserWithPokemons(
                user.getId(),
                user.getName(),
                this.pokemonRepository.findAllById(user.getOwnedPokemons())
        );
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

    GuestUserDTO createGuestUser(GuestUserDTO guestUserDTO) {
        User newUser = new User(guestUserDTO);

        User savedUser = this.userRepository.save(newUser);
        return GuestUserDTO.fromUser(savedUser);
    }

    GuestUserDTO getGuestUser(Long id) {
        Optional<User> existingGuestUser = this.userRepository.findById(id);

        if (existingGuestUser.isEmpty()) {
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return GuestUserDTO.fromUser(existingGuestUser.get());
    }

}
